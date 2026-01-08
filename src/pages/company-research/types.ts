// FRONTEND-ONLY / MOCK DATA
// No backend integration in Phase 3

export interface CompanyProfile {
  name: string;
  industry: string;
  size: string; // e.g., "1,000-5,000 employees"
  location: string;
  founded: number;
  status: 'Public' | 'Private';
}

export interface CompanyFact {
  label: string;
  value: string;
  icon: string; // Remix icon class
}

export interface CultureData {
  values: string[];
  workEnvironment: string;
  remotePolicy: string;
  benefits: string[];
}

export interface RedFlag {
  concern: string;
  context: string; // mitigation/explanation
  severity: 'low' | 'medium' | 'high';
}

export interface InterviewTips {
  format: string;
  commonQuestions: string[];
  questionsToAsk: string[];
  whatTheyValue: string[];
  timeline: string;
}

export interface CompanyInsights {
  profile: CompanyProfile;
  facts: CompanyFact[];
  culture: CultureData;
  redFlags: RedFlag[];
  interviewTips: InterviewTips;
  attribution: {
    facts: string;
    culture: string;
    redFlags: string;
    interviewTips: string;
  };
}
