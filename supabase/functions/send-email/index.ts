
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // If scheduling, just update the draft (User allows CRUD, so this is fine with user client or admin)
    // But let's use Admin client to be consistent if we decide to lock down status/schedule columns.
    // For "scheduled_at" strictly, user might be able to set it.
    // But let's stick to the pattern: User requests action, server validates and performs it.

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (scheduledAt) {
      const { data: draft, error: updateError } = await supabaseAdmin
        .from('email_drafts')
        .update({
          status: 'scheduled',
          scheduled_at: scheduledAt,
        })
        .eq('id', emailDraftId)
        .eq('user_id', user.id) // Ensure we only update if it belongs to user
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

    // 3. Send Email (Mock)
    // TODO: Implement actual email sending

    // Mock email sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 4. Update draft status (Service Role)
    const { data: draft, error: updateError } = await supabaseAdmin
      .from('email_drafts')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
      })
      .eq('id', emailDraftId)
      .eq('user_id', user.id) // Security check: must belong to user
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully (mock)',
        draft: draft
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
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
