import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        console.log('--- Save CV Text Start ---');

        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            throw new Error('Missing Authorization header');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
        const token = authHeader.replace('Bearer ', '');

        const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } }
        });

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
        if (userError || !user) {
            console.error('Auth failed:', userError);
            throw new Error('Unauthorized');
        }
        console.log('User verified:', user.id);

        // Parse request body
        const { cv_text } = await req.json();

        if (!cv_text || typeof cv_text !== 'string') {
            throw new Error('CV text is required');
        }

        if (cv_text.length > 50000) {
            throw new Error('CV text is too long (max 50,000 characters)');
        }

        // Update using service role
        const supabaseAdmin = createClient(
            supabaseUrl,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // Check if user has a CV record
        const { data: existing } = await supabaseAdmin
            .from('user_cvs')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

        let result;
        if (existing) {
            console.log('Updating existing CV text');
            result = await supabaseAdmin
                .from('user_cvs')
                .update({ cv_text })
                .eq('id', existing.id)
                .select()
                .single();
        } else {
            console.log('Creating new CV record with text only');
            result = await supabaseAdmin
                .from('user_cvs')
                .insert({
                    user_id: user.id,
                    file_path: 'text-only',
                    original_filename: 'cv_text_entry',
                    cv_text
                })
                .select()
                .single();
        }

        if (result.error) {
            console.error('Database error:', result.error);
            throw result.error;
        }

        console.log('CV text saved successfully');
        return new Response(
            JSON.stringify({ success: true, data: result.data }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('--- Save CV Text Error ---', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
