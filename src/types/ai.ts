export interface AIAssessmentResponse {
    qualification_score: number;
    match_level: 'poor' | 'fair' | 'strong';
    reasoning: string[];
    cover_letter: string | null;
    email_draft: string | null;
    warnings: string[];
    improvement_suggestions: string[];
}

export interface AssessmentRequest {
    cv_text: string;
    job_description?: string;
}

export interface AssessmentError {
    message: string;
    code?: string;
}
