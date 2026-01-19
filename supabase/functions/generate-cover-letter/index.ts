import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateRequest {
  job_description: string;
  company_name: string;
  position: string;
  company_values?: string;
  tone?: 'professional' | 'enthusiastic' | 'creative';
  cv_text?: string;
  title?: string;
  application_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('--- Generate Cover Letter Start ---');

    console.log('[Step 1] Verifying User Auth');
    const authHeader = req.headers.get('Authorization');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !anonKey) {
      console.error('Config check: Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
    }

    if (!authHeader) {
      console.error('Auth check: Missing Authorization header');
      return new Response(
        JSON.stringify({ success: false, error: 'No authorization header provided' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Auth check: Header present, length: ${authHeader.length}, starts with: ${authHeader.substring(0, 15)}...`);

    const supabaseClient = createClient(
      supabaseUrl ?? '',
      anonKey ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Try explicit getUser with token
    const token = authHeader.replace('Bearer ', '');
    console.log(`Auth check: Verifying token (length: ${token.length})...`);

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      console.error('Auth check: User verification failed:', userError?.message || 'No user found');
      if (userError) console.error('Auth error object:', JSON.stringify(userError));

      // Fallback for debugging: log the raw header if we are absolutely sure about the environment
      // (Actually, don't log full sensitive tokens in prod, but this is debug phase)

      return new Response(
        JSON.stringify({
          success: false,
          error: `Unauthorized: ${userError?.message || 'Invalid session'}`,
          debug: { headerLength: authHeader.length, tokenLength: token.length }
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    console.log(`Auth check: User ${user.id} verified`);

    // 2. Parse request body
    console.log('[Step 2] Parsing Request Body');
    const body: GenerateRequest = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    const {
      job_description,
      company_name,
      position,
      company_values = '',
      tone = 'professional',
      cv_text = '',
      title = 'Cover Letter',
      application_id
    } = body;

    if (!job_description || !company_name || !position) {
      console.error('Validation: Missing required fields');
      return new Response(
        JSON.stringify({ success: false, error: 'job_description, company_name, and position are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Get user profile for personalization
    console.log('[Step 3] Fetching User Profile');
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('full_name, headline, bio, experience_level')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      console.warn('Profile fetch: Warning - error fetching profile:', profileError.message);
    }

    const userName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Applicant';
    const userHeadline = profile?.headline || '';
    const userBio = profile?.bio || '';
    console.log(`Profile fetch: Name: ${userName}, Headline: ${userHeadline}`);

    // 4. Build AI prompt based on tone
    console.log('[Step 4] Building AI Prompt');
    const toneInstructions = {
      professional: 'Use a formal, polished tone. Be concise and business-like.',
      enthusiastic: 'Show genuine excitement and passion. Use slightly warmer language while remaining professional.',
      creative: 'Be original and memorable. Use engaging storytelling where appropriate.'
    };

    const systemPrompt = `You are an expert career coach and professional cover letter writer.
Your task is to create a compelling, personalized cover letter.

GUIDELINES:
- ${toneInstructions[tone]}
- Address to "Dear Hiring Manager" unless company values suggest otherwise
- Keep it to 3-4 paragraphs maximum
- Highlight relevant skills from the CV that match the job description
- Reference company values if provided to show cultural fit
- Use specific examples and metrics when possible
- End with a confident call to action
- Sign off with the candidate's name

CANDIDATE INFORMATION:
Name: ${userName}
${userHeadline ? `Professional Title: ${userHeadline}` : ''}
${userBio ? `Bio: ${userBio}` : ''}
${cv_text ? `CV Summary:\n${cv_text.substring(0, 2000)}` : ''}

JOB DETAILS:
Company: ${company_name}
Position: ${position}
Job Description: ${job_description}
${company_values ? `Company Values/Philosophy: ${company_values}` : ''}

Write the cover letter now. Output ONLY the letter content, no additional commentary.`;

    // 5. Call Gemini API
    console.log('[Step 5] Calling Gemini API');
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.error('Gemini API: GEMINI_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'AI service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const startTime = Date.now();
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            temperature: tone === 'creative' ? 0.9 : tone === 'enthusiastic' ? 0.7 : 0.5,
            maxOutputTokens: 1500,
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API: HTTP error:', geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: `AI generation error (${geminiResponse.status})` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await geminiResponse.json();
    const generatedContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('Gemini API: No content in response', JSON.stringify(geminiData));
      return new Response(
        JSON.stringify({ success: false, error: 'AI produced an empty response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const generationTime = Date.now() - startTime;
    console.log(`Gemini API: Success - generated in ${generationTime}ms`);

    // 6. Save to database
    console.log('[Step 6] Saving to Database');
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get next version number for this application
    let version = 1;
    if (application_id) {
      console.log(`DB: Fetching versions for application: ${application_id}`);
      const { data: existingVersions, error: versionError } = await supabaseAdmin
        .from('cover_letters')
        .select('version')
        .eq('user_id', user.id)
        .eq('application_id', application_id)
        .order('version', { ascending: false })
        .limit(1);

      if (versionError) {
        console.warn('DB: Warning - error checking versions:', versionError.message);
      } else if (existingVersions && existingVersions.length > 0) {
        version = existingVersions[0].version + 1;
      }
    }
    console.log(`DB: Saving version ${version}`);

    const { data: coverLetter, error: insertError } = await supabaseAdmin
      .from('cover_letters')
      .insert({
        user_id: user.id,
        application_id: application_id || null,
        title: title || `${company_name} - ${position}`,
        content: generatedContent,
        company_name,
        position,
        job_description,
        company_values,
        tone,
        version,
        is_favorite: false,
        generated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('DB: Insert failed:', insertError.message);
      return new Response(
        JSON.stringify({ success: false, error: `Database error: ${insertError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('--- Generate Cover Letter Success ---');

    return new Response(
      JSON.stringify({
        success: true,
        coverLetter,
        generationTimeMs: generationTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('--- Generate Cover Letter Panic ---', error.message);
    return new Response(
      JSON.stringify({ success: false, error: `Critical failure: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

