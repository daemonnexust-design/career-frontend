import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

interface OptimizeRequest {
    cv_text: string;
    job_description: string;
}

interface OptimizeResponseSchema {
    optimized_text: string;
    changes_summary: string[];
}

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `
You are an expert resume writer and career strategist specializing in Applicant Tracking Systems (ATS).
Your goal is to optimize a user's CV bullet points to better match a specific Job Description.

CORE RULES:
1. DO NOT fabricate experience. Maintain the truth of the original CV.
2. Optimize bullet points by incorporating key terminology and skills from the Job Description.
3. Use strong action verbs and quantify impact where possible (e.g., "Increased efficiency by 20%" instead of "Made things faster").
4. Keep the output professional, concise, and punchy.
5. Provide a summary of the most significant changes you made.

OUTPUT FORMAT:
Return ONLY valid JSON matching this schema:
{
    "optimized_text": string, // The full optimized CV text
    "changes_summary": string[] // 3-5 bullet points explaining key improvements (e.g., "Enhanced Cloud Infrastructure keywords", "Quantified performance metrics in Experience section")
}
`;

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: CORS_HEADERS });
    }

    try {
        const authHeader = req.headers.get('Authorization');
        console.log('Auth Header Present:', !!authHeader);
        if (!authHeader) throw new Error('Missing Authorization header');

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

        if (!geminiApiKey) throw new Error('Server Config Error: Missing Gemini API Key');

        const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } },
            auth: { persistSession: false }
        });

        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

        if (userError || !user) {
            console.error('User Auth Error:', userError);
            throw new Error(`Unauthorized: ${userError?.message || 'No User Found'}`);
        }
        console.log('User Verified:', user.id);

        const { cv_text, job_description } = await req.json() as OptimizeRequest;
        if (!cv_text || !job_description) throw new Error('Missing cv_text or job_description');

        const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`;

        const prompt = `
<<<ORIGINAL_CV>>>
${cv_text.substring(0, 20000)}
<<<ORIGINAL_CV>>>

<<<JOB_DESCRIPTION>>>
${job_description.substring(0, 5000)}
<<<JOB_DESCRIPTION>>>
`;

        const geminiBody = {
            contents: [{
                parts: [{ text: SYSTEM_PROMPT + "\n\n" + prompt }]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.3,
            }
        };

        const geminiRes = await fetch(GEMINI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiBody)
        });

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            throw new Error(`AI Provider Error: ${geminiRes.status}`);
        }

        const geminiData = await geminiRes.json();
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) throw new Error('Empty response from AI Provider');

        const parsedResult = JSON.parse(rawText) as OptimizeResponseSchema;

        // Log usage
        await supabaseAdmin.from('ai_usage_logs').insert({
            user_id: user.id,
            model_id: 'gemini-flash-latest',
            tokens_input: geminiData.usageMetadata?.promptTokenCount || 0,
            tokens_output: geminiData.usageMetadata?.candidatesTokenCount || 0,
            request_type: 'optimize_cv'
        });

        return new Response(
            JSON.stringify(parsedResult),
            { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Optimize CV Error:', error);
        return new Response(
            JSON.stringify({ error: error.message || 'Internal Server Error' }),
            { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
        );
    }
});
