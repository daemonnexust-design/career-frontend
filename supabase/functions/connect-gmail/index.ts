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

        // 2. Get provider tokens from the session
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        if (sessionError || !session) {
            throw new Error('No active session');
        }

        const providerToken = session.provider_token;
        const providerRefreshToken = session.provider_refresh_token;

        if (!providerToken) {
            throw new Error('No Gmail provider token found. Please re-authenticate with Google.');
        }

        // 3. Get the user's email from Google (validate token works)
        const googleUserInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${providerToken}`,
            },
        });

        if (!googleUserInfo.ok) {
            throw new Error('Failed to verify Google token');
        }

        const userInfo = await googleUserInfo.json();
        const gmailEmail = userInfo.email;

        // 4. Calculate expires_at (Google tokens typically expire in 1 hour = 3600 seconds)
        const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();

        // 5. Upsert tokens into user_gmail_tokens (Service Role)
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const { error: upsertError } = await supabaseAdmin
            .from('user_gmail_tokens')
            .upsert({
                user_id: user.id,
                access_token: providerToken,
                refresh_token: providerRefreshToken || null,
                expires_at: expiresAt,
                gmail_email: gmailEmail,
            }, {
                onConflict: 'user_id',
            });

        if (upsertError) {
            console.error('Upsert error:', upsertError);
            throw new Error('Failed to store Gmail tokens');
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Gmail connected successfully',
                email: gmailEmail,
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        );

    } catch (error) {
        console.error('connect-gmail error:', error.message);
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
