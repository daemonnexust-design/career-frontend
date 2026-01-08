
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

    // Fetch all user data (NDPR/GDPR compliance)
    const [
      { data: profile },
      { data: applications },
      { data: coverLetters },
      { data: emailDrafts },
      { data: cvUploads },
      { data: companyResearch },
      { data: consents }
    ] = await Promise.all([
      supabaseClient.from('profiles').select('*').eq('id', user.id).single(),
      supabaseClient.from('applications').select('*').eq('user_id', user.id),
      supabaseClient.from('cover_letters').select('*').eq('user_id', user.id),
      supabaseClient.from('email_drafts').select('*').eq('user_id', user.id),
      supabaseClient.from('cv_uploads').select('*').eq('user_id', user.id),
      supabaseClient.from('company_research').select('*').eq('user_id', user.id),
      supabaseClient.from('user_consent').select('*').eq('user_id', user.id),
    ]);

    // Compile all data
    const userData = {
      export_date: new Date().toISOString(),
      user_id: user.id,
      profile: profile,
      applications: applications || [],
      cover_letters: coverLetters || [],
      email_drafts: emailDrafts || [],
      cv_uploads: cvUploads || [],
      company_research: companyResearch || [],
      consents: consents || [],
      metadata: {
        total_applications: applications?.length || 0,
        total_cover_letters: coverLetters?.length || 0,
        total_emails: emailDrafts?.length || 0,
        total_research: companyResearch?.length || 0,
      }
    };

    return new Response(
      JSON.stringify(userData, null, 2),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="user-data-${user.id}-${Date.now()}.json"`
        },
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
