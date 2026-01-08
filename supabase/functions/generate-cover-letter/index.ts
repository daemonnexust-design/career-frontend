
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
    // 1. Verify User (using Anon key provided in header)
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

    // 2. Parse request body
    const { companyName, position, cvData, applicationId } = await req.json();

    if (!companyName || !position) {
      throw new Error('Company name and position are required');
    }

    // 3. Generate Content (Mock AI)
    // TODO: Replace with your AI provider API call
    // Example: OpenAI, Anthropic, etc.

    const startTime = Date.now();

    const coverLetterContent = `Dear Hiring Manager,

I am writing to express my strong interest in the ${position} position at ${companyName}. With my background and skills, I am confident I would be a valuable addition to your team.

${cvData ? `My experience includes ${cvData.summary || 'relevant professional experience'} that aligns well with the requirements of this role.` : 'My professional experience aligns well with the requirements of this role.'}

I am particularly drawn to ${companyName} because of your reputation for innovation and excellence in the industry. I am excited about the opportunity to contribute to your team's success.

Key qualifications I bring include:
• Strong problem-solving and analytical skills
• Proven track record of delivering results
• Excellent communication and collaboration abilities
• Passion for continuous learning and growth

I would welcome the opportunity to discuss how my skills and experience can benefit ${companyName}. Thank you for considering my application.

Sincerely,
${user.user_metadata?.full_name || 'Your Name'}`;

    const generationTime = Date.now() - startTime;

    // 4. Save to database using SERVICE ROLE (Bypass RLS)
    // We use Service Role because RLS prevents users from inserting directly into 'cover_letters'
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: coverLetter, error: insertError } = await supabaseAdmin
      .from('cover_letters')
      .insert({
        user_id: user.id,
        application_id: applicationId || null,
        company_name: companyName,
        position: position,
        content: coverLetterContent,
        generated_at: new Date().toISOString(), // Ensure timestamp
        // ai_model: 'mock-v1', // Column not in schema yet, commenting out to avoid error
        // generation_time_ms: generationTime, // Column not in schema yet
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        coverLetter: coverLetter,
        message: 'Cover letter generated successfully'
      }),
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
