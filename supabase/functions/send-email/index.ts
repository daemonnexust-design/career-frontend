import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Refresh an expired access token using the refresh token
 */
async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; expiresAt: string } | null> {
  const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
  const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
    return null;
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Token refresh failed:', errorData);
      return null;
    }

    const data = await response.json();
    const expiresAt = new Date(Date.now() + (data.expires_in * 1000)).toISOString();

    return {
      accessToken: data.access_token,
      expiresAt: expiresAt,
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}

/**
 * Encode email to RFC 2822 format and base64url encode it
 */
function createRawEmail(to: string, from: string, subject: string, body: string): string {
  const email = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    body,
  ].join('\r\n');

  // Base64url encode
  const base64 = btoa(unescape(encodeURIComponent(email)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Verify User
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // 2. Parse request body
    const { emailDraftId, recipient, subject, body, scheduledAt } = await req.json();

    if (!recipient || !subject || !body) {
      throw new Error('Recipient, subject, and body are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipient)) {
      throw new Error('Invalid email address');
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // If scheduling, just update the draft
    if (scheduledAt) {
      const { data: draft, error: updateError } = await supabaseAdmin
        .from('email_drafts')
        .update({
          status: 'scheduled',
          scheduled_at: scheduledAt,
        })
        .eq('id', emailDraftId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email scheduled successfully',
          draft: draft
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // 3. Fetch user's Gmail tokens
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from('user_gmail_tokens')
      .select('access_token, refresh_token, expires_at, gmail_email')
      .eq('user_id', user.id)
      .single();

    if (tokenError || !tokenData) {
      throw new Error('Gmail not connected. Please connect your Gmail account first.');
    }

    let accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const gmailEmail = tokenData.gmail_email;

    // 4. Check if token is expired and refresh if needed
    const now = new Date();
    const expiresAt = tokenData.expires_at ? new Date(tokenData.expires_at) : null;

    if (expiresAt && now >= expiresAt) {
      console.log('Access token expired, attempting refresh...');

      if (!refreshToken) {
        throw new Error('Gmail token expired and no refresh token available. Please reconnect your Gmail account.');
      }

      const refreshResult = await refreshAccessToken(refreshToken);
      if (!refreshResult) {
        throw new Error('Failed to refresh Gmail token. Please reconnect your Gmail account.');
      }

      accessToken = refreshResult.accessToken;

      // Update the token in the database
      await supabaseAdmin
        .from('user_gmail_tokens')
        .update({
          access_token: refreshResult.accessToken,
          expires_at: refreshResult.expiresAt,
        })
        .eq('user_id', user.id);

      console.log('Token refreshed successfully');
    }

    // 5. Send email via Gmail API
    const rawEmail = createRawEmail(recipient, gmailEmail, subject, body);

    const gmailResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: rawEmail,
      }),
    });

    if (!gmailResponse.ok) {
      const errorData = await gmailResponse.text();
      console.error('Gmail API error:', errorData);

      // Check if it's an auth error
      if (gmailResponse.status === 401) {
        throw new Error('Gmail authentication failed. Please reconnect your Gmail account.');
      }

      throw new Error(`Failed to send email via Gmail: ${gmailResponse.status}`);
    }

    const gmailResult = await gmailResponse.json();
    console.log('Email sent successfully, Gmail message ID:', gmailResult.id);

    // 6. Update draft status
    if (emailDraftId) {
      const { data: draft, error: updateError } = await supabaseAdmin
        .from('email_drafts')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
        })
        .eq('id', emailDraftId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        console.error('Failed to update draft status:', updateError);
        // Don't throw - email was already sent
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully via Gmail',
        gmailMessageId: gmailResult.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('send-email error:', error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
