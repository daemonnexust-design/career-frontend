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

        // 2. Verify Admin Role (Crucial Security Check)
        // We must query the 'profiles' table to check the role.
        // Since 'profiles' is readable by the user (own profile), we can use the user client?
        // NO. Best prafctice: Use Service Role to query the profile to be absolutely sure we trust the data source
        // and not relying on any potential RLS mishaps, although RLS should prevent reading others.
        // Actually, RLS allows user to read OWN profile. So 'supabaseClient' can read it.
        // But let's use Service Role to strict check.

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profileError || !profile || profile.role !== 'admin') {
            console.log(`Unauthorized admin attempt by user ${user.id}`);
            return new Response(
                JSON.stringify({ error: 'Forbidden: Admin access only' }),
                { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // 3. Handle Admin Action
        const { action, payload } = await req.json();

        let result;

        switch (action) {
            case 'flag-user':
                // Payload: { targetUserId, reason }
                // TODO: Implement flagging logic (e.g., update a 'status' field in profiles or create a flag record)
                // For now, just log it.
                console.log(`User ${payload.targetUserId} flagged by admin ${user.id}: ${payload.reason}`);
                result = { success: true, message: `User ${payload.targetUserId} flagged` };
                break;

            case 'review-application':
                // Payload: { applicationId, decision, feedback }
                // Update application status
                if (!payload.applicationId || !payload.decision) {
                    throw new Error('Missing applicationId or decision');
                }

                const { data: app, error: appError } = await supabaseAdmin
                    .from('applications')
                    .update({
                        status: payload.decision, // e.g., 'reviewed', 'rejected'
                        // feedback: payload.feedback // Column not in schema yet
                    })
                    .eq('id', payload.applicationId)
                    .select()
                    .single();

                if (appError) throw appError;
                result = { success: true, application: app };
                break;

            default:
                throw new Error('Invalid action');
        }

        return new Response(
            JSON.stringify(result),
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
