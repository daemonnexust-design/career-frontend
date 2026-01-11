import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AIAssessmentResponse, AssessmentRequest, AssessmentError } from '@/types/ai';

export function useAIAssessment() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AIAssessmentResponse | null>(null);
    const [error, setError] = useState<AssessmentError | null>(null);

    const assessCandidate = async (request: AssessmentRequest) => {
        try {
            setLoading(true);
            setError(null);
            setResult(null);

            const { data, error } = await supabase.functions.invoke('assess-candidate', {
                body: request
            });

            if (error) throw error;

            setResult(data as AIAssessmentResponse);

        } catch (err: any) {
            console.error('Assessment failed:', err);
            setError({
                message: err.message || 'An unexpected error occurred during assessment.'
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        assessCandidate,
        loading,
        result,
        error,
        reset: () => {
            setResult(null);
            setError(null);
        }
    };
}
