import { EmailDraft } from '../types';

/**
 * Mock email generator - produces deterministic sample content
 * PLACEHOLDER: Real AI generation will replace this in production
 */
export function generateMockEmail(companyName: string = 'ABC Company'): EmailDraft {
  return {
    subject: `Application for Software Engineer Position at ${companyName}`,
    body: `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at ${companyName}. With my background in full-stack development and passion for building scalable applications, I believe I would be a valuable addition to your team.

In my previous role, I successfully delivered multiple projects using React, TypeScript, and Node.js, which aligns well with the technical requirements outlined in your job posting. I am particularly excited about ${companyName}'s mission and the opportunity to contribute to innovative solutions.

I have attached my CV for your review and would welcome the opportunity to discuss how my skills and experience can benefit your team.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]`,
    recipient: `hiring@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
    generatedAt: new Date()
  };
}
