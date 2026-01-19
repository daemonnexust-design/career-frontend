import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    try {
        console.log('--- Download CV Start ---');

        const authHeader = req.headers.get('Authorization');
        console.log('Auth header present:', !!authHeader);

        if (!authHeader) throw new Error('Missing Authorization header');

        // Extract the JWT token from the Authorization header
        const token = authHeader.replace('Bearer ', '');

        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

        console.log('Supabase URL configured:', !!supabaseUrl);
        console.log('Supabase Anon Key configured:', !!supabaseAnonKey);

        const supabaseClient = createClient(
            supabaseUrl,
            supabaseAnonKey,
            { global: { headers: { Authorization: authHeader } } }
        );

        // Pass the token directly to getUser() - required for Edge Functions
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

        if (userError) {
            console.error('User auth error:', userError.message);
            throw new Error(`Auth failed: ${userError.message}`);
        }

        if (!user) {
            console.error('No user returned from getUser()');
            throw new Error('Unauthorized: No user found');
        }

        console.log('User verified:', user.id);

        // Admin client to sign URL (Private Bucket)
        const supabaseAdmin = createClient(
            supabaseUrl,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // Fetch the file path from the database
        const { data: cvRecord, error: dbError } = await supabaseAdmin
            .from('user_cvs')
            .select('file_path')
            .eq('user_id', user.id)
            .maybeSingle();

        if (dbError || !cvRecord?.file_path) {
            console.error('Database fetch error or no CV found:', dbError);
            throw new Error('CV record not found in database. Please upload a CV first.');
        }

        const filePath = cvRecord.file_path;
        console.log('Looking for file in storage:', filePath);

        // Check if file exists in bucket (cv-uploads)
        const pathParts = filePath.split('/');
        const fileNameInBucket = pathParts.pop();
        const folderPath = pathParts.join('/');

        const { data: files, error: listError } = await supabaseAdmin.storage.from('cv-uploads').list(folderPath);

        if (listError) {
            console.error('Storage list error:', listError);
            throw new Error(`Storage error: ${listError.message}`);
        }

        console.log('Files found in folder:', files?.map(f => f.name));
        const hasCV = files?.find(f => f.name === fileNameInBucket);

        if (!hasCV) {
            console.log('CV file not found in storage');
            throw new Error('CV not found in storage. Please upload a CV first.');
        }

        const { data, error } = await supabaseAdmin
            .storage
            .from('cv-uploads')
            .createSignedUrl(filePath, 60);

        if (error) {
            console.error('Signed URL error:', error);
            throw error;
        }

        console.log('Signed URL created successfully');
        return new Response(
            JSON.stringify({ success: true, signedUrl: data.signedUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('--- Download CV Error ---', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message || 'Unknown error' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
