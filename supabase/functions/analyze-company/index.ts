import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyzeRequest {
    company_url: string;
    user_cv_context?: string;
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { company_url, user_cv_context } = await req.json() as AnalyzeRequest;

        if (company_url === 'health-check') {
            const anon = Deno.env.get('SUPABASE_ANON_KEY');
            return new Response(JSON.stringify({
                status: 'ok',
                hasAuth: !!req.headers.get('Authorization'),
                hasGemini: !!Deno.env.get('GEMINI_API_KEY'),
                hasSupabase: !!Deno.env.get('SUPABASE_URL'),
                hasAnonKey: !!anon,
                anonKeyLength: anon ? anon.length : 0
            }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        if (!company_url) {
            throw new Error('company_url is required');
        }

        // 1. Verify Auth
        const authHeader = req.headers.get('Authorization');
        console.log('Incoming Headers:', JSON.stringify([...req.headers.entries()]));
        if (!authHeader) {
            throw new Error('No authorization header');
        }

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: authHeader } } }
        );

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
        if (userError || !user) {
            console.error('Auth Error:', userError);
            throw new Error(`Unauthorized Debug: ${userError?.message || 'No user'} | TokenLen: ${token.length}`);
        } // 2. Fetch Company Content (Best Effort)
        let companyContext = `Target URL: ${company_url}`;
        try {
            console.log(`Fetching ${company_url}...`);
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const response = await fetch(company_url, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; CareerAI/1.0;)'
                }
            });
            clearTimeout(id);

            if (response.ok) {
                const text = await response.text();
                // Naive scraper: just grab body text, truncate to 10k chars
                const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 10000);
                companyContext += `\n\nScraped Content Snippet:\n${cleanText}`;
            } else {
                console.warn(`Fetch failed: ${response.status}`);
                companyContext += `\n(Fetch failed, rely on internal knowledge)`;
            }
        } catch (err) {
            console.warn('Fetch error:', err);
            companyContext += `\n(Fetch error, rely on internal knowledge)`;
        }

        // 3. Call Gemini
        if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set');

        const prompt = `
${SYSTEM_PROMPT}

USER CONTEXT:
${user_cv_context ? `Candidate CV Context: ${user_cv_context}` : 'No specific CV context provided.'}

TARGET COMPANY DATA:
${companyContext}

Generate the JSON analysis now.
    `;

        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        response_mime_type: "application/json"
                    }
                })
            }
        );

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            throw new Error(`Gemini API Error: ${errText}`);
        }

        const geminiData = await geminiRes.json();
        const resultText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!resultText) throw new Error('No content from AI');

        const analysis = JSON.parse(resultText);

        return new Response(
            JSON.stringify(analysis),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
