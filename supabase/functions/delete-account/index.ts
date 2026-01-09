import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) throw new Error('Missing Authorization header');

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: authHeader } } }
        );

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
        if (userError || !user) throw new Error('Unauthorized');

        const { confirmation } = await req.json();
        if (confirmation !== 'DELETE MY ACCOUNT') {
            throw new Error('Invalid confirmation string. You must type "DELETE MY ACCOUNT" exactly.');
        }

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. CLEANUP STORAGE
        // Delete CV file
        const { error: storageError } = await supabaseAdmin
            .storage
            .from('cv-uploads')
            .remove([`${user.id}/cv.pdf`]);

        // Warn but continue if storage fail?
        // Better to log it.
        if (storageError) console.error('Storage deletion failed', storageError);
        // Also delete any other folders?

        // 2. DELETE USER (Cascades to Profiles, Cvs, Letters due to FK constraints)
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

        if (deleteError) throw deleteError;

        return new Response(
            JSON.stringify({ success: true, message: 'Account permanently deleted' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
