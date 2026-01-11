import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// --------------------------------------------------------------------------
// CONTRACT DEFINITIONS
// --------------------------------------------------------------------------

interface AssessmentRequest {
    cv_text: string;
    job_description?: string;
}

interface GeminiResponseSchema {
    qualification_score: number;
    match_level: "poor" | "fair" | "strong";
    reasoning: string[];
    cover_letter: string | null;
    email_draft: string | null;
    warnings: string[];
    improvement_suggestions: string[];
}

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --------------------------------------------------------------------------
// SYSTEM PROMPT
// --------------------------------------------------------------------------
const SYSTEM_PROMPT = `
You are a Senior Technical Recruiter and AI Assessor.
Your task is to evaluate a candidate's CV against a Job Description.

EXECUTION RULES:
1. Output MUST be valid JSON only. No markdown formatting.
2. Adhere strictly to the JSON schema.
3. If qualification_score < 40, cover_letter and email_draft MUST be null.
4. "warnings" array must list any red flags or missing critical skills.
5. "improvement_suggestions" must contain 3-5 specific, actionable bullet points to improve the CV.

JSON SCHEMA:
{
  "qualification_score": number, // 0-100
  "match_level": "poor" | "fair" | "strong",
  "reasoning": string[],
  "cover_letter": string | null, // valid HTML string or null
  "email_draft": string | null, // plain text or null
  "warnings": string[],
  "improvement_suggestions": string[] // actionable advice to increase score
}
`;

serve(async (req) => {
    // 1. CORS Preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: CORS_HEADERS });
    }

    try {
        // 2. Auth & Setup
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) throw new Error('Missing Authorization header');

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

        if (!geminiApiKey) throw new Error('Server Config Error: Missing Gemini API Key');

        // Client for Auth Verification
        const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } },
            auth: { persistSession: false }
        });

        // Admin Client for Logs (RLS Bypass)
        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

        // Verify User
        const token = authHeader.replace('Bearer ', '');

        // Explicitly pass token to getUser to ensure it's used
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

        if (userError || !user) {
            console.error('Auth Debug:', {
                userError,
                hasUser: !!user,
                url: supabaseUrl,
                hasAnon: !!supabaseAnonKey,
                authHeaderLen: authHeader?.length
            });
            throw new Error(`Unauthorized: ${userError?.message || 'No User Found'}`);
        }

        // 3. Parse Input
        let { cv_text, job_description } = await req.json() as AssessmentRequest;
        if (!cv_text) throw new Error('Missing cv_text');

        // Default to General Analysis if no job description provided
        if (!job_description || !job_description.trim()) {
            job_description = `
            ASSESSMENT CONTEXT: GENERAL PROFESSIONAL QUALITY CHECK
            
            Since no specific job description was provided, evaluate the candidate's CV based on general employability standards:
            1. Clarity, Structure, and Formatting.
            2. Presence of strong metrics and results (Action verbs, quantified impact).
            3. Professional tone and grammar.
            4. Effective presentation of skills.

            SCHEMA MAPPING GUIDANCE:
            - "match_level": "strong" (Top tier, highly employable), "fair" (Average, needs work), "poor" (Weak, significant issues).
            - "qualification_score": Rate the overall quality out of 100.
            `;
        }

        // 4. Rate Limiting / Quota Check (Mock for now, strictly logging)

        // 5. Call Gemini API
        // Switching to 'gemini-flash-latest' (Standard Flash alias) to avoid 2.0 quota limits
        const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`;

        const startTime = Date.now();

        const prompt = `
<<<CV_DATA>>>
${cv_text.substring(0, 20000)} -- Truncated for safety
<<<CV_DATA>>>

<<<JOB_DESC>>>
${job_description.substring(0, 5000)}
<<<JOB_DESC>>>
    `;

        const geminiBody = {
            contents: [{
                parts: [{ text: SYSTEM_PROMPT + "\n\n" + prompt }]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2, // Low temp for deterministic output
            }
        };

        const geminiRes = await fetch(GEMINI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiBody)
        });

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            console.error('Gemini API Error:', errText);
            throw new Error(`AI Provider Error: ${geminiRes.status} | ${errText}`);
        }

        const geminiData = await geminiRes.json();
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) throw new Error('Empty response from AI Provider');

        // 6. Validate & Parse Response
        let parsedResult: GeminiResponseSchema;
        try {
            parsedResult = JSON.parse(rawText);

            // Strict Schema Validation Logic
            if (typeof parsedResult.qualification_score !== 'number') throw new Error('Invalid score type');
            if (!['poor', 'fair', 'strong'].includes(parsedResult.match_level)) throw new Error('Invalid match_level');

            // Enforce Cost Control Rule
            if (parsedResult.qualification_score < 40) {
                parsedResult.cover_letter = null;
                parsedResult.email_draft = null;
            }

        } catch (parseError) {
            console.error('JSON Parse Error:', rawText);
            throw new Error('Failed to parse AI response');
        }

        const processingTime = Date.now() - startTime;

        // 7. Atomic Logging (Parallel)
        const requestSignature = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(user.id + cv_text.substring(0, 100) + Date.now())
        ).then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''));

        await Promise.all([
            // Usage Log
            supabaseAdmin.from('ai_usage_logs').insert({
                user_id: user.id,
                model_id: 'gemini-2.0-flash',
                tokens_input: geminiData.usageMetadata?.promptTokenCount || 0,
                tokens_output: geminiData.usageMetadata?.candidatesTokenCount || 0,
                request_type: 'assess_cv'
            }),
            // Audit Log
            supabaseAdmin.from('ai_audit_logs').insert({
                user_id: user.id,
                action_type: 'assess_cv',
                request_signature: requestSignature,
                decision_payload: parsedResult, // JSONB
                processing_time_ms: processingTime,
                meta_warnings: parsedResult.warnings
            })
        ]);

        // 8. Return Success
        return new Response(
            JSON.stringify(parsedResult),
            { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Edge Function Error:', error);
        return new Response(
            JSON.stringify({
                error: error.message || 'Unknown Error',
                details: String(error),
                stack: error.stack
            }),
            { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
        );
    }
});
