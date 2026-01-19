import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface CompanyInsight {
    id: string;
    target_url: string;
    swot_analysis: {
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
    };
    strategic_focus: string;
    culture_decoder: {
        values: string[];
        leadership_style: string;
        employee_sentiment: string;
    };
    interview_war_room: {
        trojan_horse_questions: string[];
        role_specific_challenges: string[];
    };
    created_at: string;
}

export function useCompanyResearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [insight, setInsight] = useState<CompanyInsight | null>(null);

    const fetchInsight = async (url: string) => {
        try {
            setLoading(true);
            setError(null);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            const { data, error } = await supabase
                .from('company_insights')
                .select('*')
                .eq('user_id', user.id)
                .eq('target_url', url)
                .maybeSingle();

            if (error) throw error;

            if (data) {
                setInsight(data as CompanyInsight);
                return data as CompanyInsight;
            }
            return null;
        } catch (err: any) {
            console.error('Error fetching insight:', err);
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const analyzeCompany = async (url: string, cvContext?: string) => {
        try {
            setLoading(true);
            setError(null);

            // 1. Check DB first (Reuse logic but avoid double state set if possible, 
            // but here we just want to check existence quickly)
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const { data: existing, error: fetchError } = await supabase
                .from('company_insights')
                .select('*')
                .eq('user_id', user.id)
                .eq('target_url', url)
                .maybeSingle();

            if (fetchError) throw fetchError;

            if (existing) {
                setInsight(existing as CompanyInsight);
                return existing as CompanyInsight;
            }

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('No active session');

            // 2. Call Edge Function
            const { data, error: fnError } = await supabase.functions.invoke('analyze-company', {
                body: { company_url: url, user_cv_context: cvContext },
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });

            if (fnError) throw fnError;
            if (data.error) throw new Error(data.error);

            // 3. Save to DB
            const { data: saved, error: saveError } = await supabase
                .from('company_insights')
                .insert({
                    user_id: user.id,
                    target_url: url,
                    swot_analysis: data.swot_analysis,
                    strategic_focus: data.strategic_focus,
                    culture_decoder: data.culture_decoder,
                    interview_war_room: data.interview_war_room
                })
                .select()
                .single();

            if (saveError) throw saveError;

            setInsight(saved as CompanyInsight);
            return saved as CompanyInsight;

        } catch (err: any) {
            console.error('Error analyzing company:', err);
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        insight,
        fetchInsight,
        analyzeCompany
    };
}
