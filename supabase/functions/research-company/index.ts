
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
    // Get user from JWT
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

    // Parse request body
    const { companyName, applicationId } = await req.json();

    if (!companyName) {
      throw new Error('Company name is required');
    }

    // TODO: Replace with your AI provider API call
    // Example: OpenAI, Anthropic, Perplexity, etc.
    // const AI_API_KEY = Deno.env.get('AI_API_KEY');
    
    // Mock company research data - replace with real AI call
    const researchData = {
      company: {
        name: companyName,
        industry: "Technology",
        size: "1000-5000 employees",
        founded: "2010",
        headquarters: "San Francisco, CA"
      },
      culture: {
        values: ["Innovation", "Collaboration", "Customer Focus"],
        workEnvironment: "Fast-paced, collaborative, remote-friendly",
        benefits: ["Health insurance", "401k matching", "Flexible PTO"]
      },
      insights: {
        strengths: [
          "Strong market position",
          "Innovative product line",
          "Positive employee reviews"
        ],
        challenges: [
          "Competitive market",
          "Rapid growth management"
        ]
      },
      interviewTips: [
        "Research their latest product launches",
        "Prepare examples of problem-solving",
        "Ask about team structure and growth opportunities"
      ],
      redFlags: [],
      recentNews: [
        "Recently secured Series C funding",
        "Expanded to European market"
      ]
    };

    // Save to database
    const { data: research, error: insertError } = await supabaseClient
      .from('company_research')
      .insert({
        user_id: user.id,
        application_id: applicationId || null,
        company_name: companyName,
        research_data: researchData,
        ai_model: 'mock-v1', // Replace with actual model name
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        research: research,
        message: 'Company research completed successfully'
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
