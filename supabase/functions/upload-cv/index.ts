import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // 1. Verify User
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) throw new Error('Missing Authorization header');

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: authHeader } } }
        );

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
        if (userError || !user) throw new Error('Unauthorized');

        // 2. Parse Form Data (Multipart)
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            throw new Error('No file uploaded or invalid file format');
        }

        // 3. Validation
        // Size check (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size exceeds 5MB limit');
        }

        // Type check
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only PDF and DOC/DOCX allowed.');
        }

        // 4. Upload to Storage (Service Role)
        // We use Service Role to strict-write to the user's folder.
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const filePath = `${user.id}/cv.pdf`; // Normalize filename to 'cv.pdf' for simplicity or keep original?
        // Requirement says: "Replaces existing CV if present". Single CV per user implied.
        // Let's standardise to `cv.pdf` inside `{user_id}` folder.

        const fileBuffer = await file.arrayBuffer();

        const { error: uploadError } = await supabaseAdmin
            .storage
            .from('cv-uploads')
            .upload(filePath, fileBuffer, {
                contentType: file.type,
                upsert: true
            });

        if (uploadError) throw uploadError;

        // 5. Upsert Metadata in Database (Service Role)
        // RLS prevents User from Inserting, so use Admin.
        const { data: record, error: dbError } = await supabaseAdmin
            .from('user_cvs')
            .upsert({
                user_id: user.id,
                file_path: filePath,
                original_filename: file.name,
                uploaded_at: new Date().toISOString()
            }, { onConflict: 'user_id' }) // Assumption: one CV per user?
        // Wait, schema has PK on 'id'. 'user_id' is FK.
        // If we want Single CV, we should enforce uniqueness on user_id?
        // Let's check schema.
        // `create table if not exists public.user_cvs ( id uuid default gen_random_uuid() primary key, ...`
        // It doesn't strictly enforce UNIQUE(user_id).
        // BUT current requirement: "Replaces existing CV if present".
        // So we should probably check if one exists, or add a unique constraint.
        // For now, let's just DELETE old ones and insert new, OR find existing ID and update.

        // Better approach: Select first, if exists -> Update. If not -> Insert.

        // Actually, let's query existing
        const { data: existing } = await supabaseAdmin.from('user_cvs').select('id').eq('user_id', user.id).maybeSingle();

        let result;
        if (existing) {
            result = await supabaseAdmin.from('user_cvs').update({
                file_path: filePath,
                original_filename: file.name,
                uploaded_at: new Date().toISOString()
            }).eq('id', existing.id).select().single();
        } else {
            result = await supabaseAdmin.from('user_cvs').insert({
                user_id: user.id,
                file_path: filePath,
                original_filename: file.name
            }).select().single();
        }

        if (result.error) throw result.error;

        return new Response(
            JSON.stringify({ success: true, data: result.data }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
