import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Packer,
  AlignmentType,
} from "https://esm.sh/docx@8.5.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('--- Export Cover Letter Start ---');

    // 1. Verify User
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // 2. Parse request
    const { cover_letter_id, format = 'txt' } = await req.json();

    if (!cover_letter_id) {
      throw new Error('cover_letter_id is required');
    }

    if (!['txt', 'html', 'docx'].includes(format)) {
      throw new Error('format must be txt, html, or docx');
    }

    // 3. Fetch cover letter (RLS ensures user owns it)
    const { data: coverLetter, error: fetchError } = await supabaseClient
      .from('cover_letters')
      .select('*')
      .eq('id', cover_letter_id)
      .single();

    if (fetchError || !coverLetter) {
      throw new Error('Cover letter not found');
    }

    // 4. Get user profile for signature
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();

    const userName = profile?.full_name || user.user_metadata?.full_name || 'Applicant';

    // 5. Format content based on requested format
    const safeTitle = (coverLetter.title || 'Cover Letter').replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_');

    if (format === 'docx') {
      // Generate DOCX using docx library
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Header with company and position
            new Paragraph({
              children: [
                new TextRun({
                  text: coverLetter.company_name || '',
                  bold: true,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
            coverLetter.position ? new Paragraph({
              children: [
                new TextRun({
                  text: `Position: ${coverLetter.position}`,
                  italics: true,
                  size: 22,
                  color: "666666",
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 400 },
            }) : new Paragraph({}),

            // Separator
            new Paragraph({
              spacing: { after: 200 },
            }),

            // Cover letter content - split by paragraphs
            ...coverLetter.content.split('\n\n').map((para: string) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: para.trim(),
                    size: 24,
                  }),
                ],
                spacing: { after: 200 },
              })
            ),
          ],
        }],
      });

      // Generate buffer
      const buffer = await Packer.toBuffer(doc);
      const base64Content = btoa(String.fromCharCode(...new Uint8Array(buffer)));

      console.log(`Exporting cover letter ${cover_letter_id} as DOCX`);

      return new Response(
        JSON.stringify({
          success: true,
          base64Content,
          filename: `${safeTitle}.docx`,
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          title: coverLetter.title
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TXT and HTML formats
    let exportContent: string;
    let contentType: string;
    let filename: string;

    if (format === 'html') {
      // Generate styled HTML for easy copying to Word/Docs
      exportContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${coverLetter.title || 'Cover Letter'}</title>
  <style>
    body {
      font-family: 'Georgia', serif;
      max-width: 700px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    .header {
      text-align: right;
      margin-bottom: 30px;
      color: #666;
      font-size: 0.9em;
    }
    .content {
      white-space: pre-wrap;
    }
    .signature {
      margin-top: 30px;
    }
    @media print {
      body { margin: 0; padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <strong>${coverLetter.company_name || ''}</strong><br>
    ${coverLetter.position ? `Position: ${coverLetter.position}` : ''}
  </div>
  <div class="content">${coverLetter.content}</div>
</body>
</html>`;
      contentType = 'text/html';
      filename = `${safeTitle}.html`;
    } else {
      // Plain text
      exportContent = `${coverLetter.company_name ? `Company: ${coverLetter.company_name}\n` : ''}${coverLetter.position ? `Position: ${coverLetter.position}\n` : ''}${coverLetter.company_name || coverLetter.position ? '\n---\n\n' : ''}${coverLetter.content}`;
      contentType = 'text/plain';
      filename = `${safeTitle}.txt`;
    }

    console.log(`Exporting cover letter ${cover_letter_id} as ${format}`);

    return new Response(
      JSON.stringify({
        success: true,
        content: exportContent,
        filename,
        contentType,
        title: coverLetter.title
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('--- Export Cover Letter Error ---', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
