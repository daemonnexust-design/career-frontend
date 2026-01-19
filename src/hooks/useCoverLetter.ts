import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

interface CoverLetter {
    id: string;
    user_id: string;
    application_id: string | null;
    title: string;
    content: string;
    company_name: string;
    position: string;
    job_description: string;
    company_values: string | null;
    tone: 'professional' | 'enthusiastic' | 'creative';
    version: number;
    is_favorite: boolean;
    generated_at: string;
    updated_at: string;
}

interface GenerateSettings {
    job_description: string;
    company_name: string;
    position: string;
    company_values?: string;
    tone?: 'professional' | 'enthusiastic' | 'creative';
    cv_text?: string;
    title?: string;
    application_id?: string;
}

// Helper function to convert error messages to user-friendly text
const getReadableError = (error: any): string => {
    const message = error?.message || String(error);
    console.warn('[CoverLetter Hook] Error caught:', message);

    // Session/Auth errors
    if (message.includes('Auth session missing') || message.includes('No authorization')) {
        return 'Your session has expired. Please refresh the page and try again.';
    }
    if (message.includes('Unauthorized') || message.includes('401')) {
        return 'Authentication failed. Please try logging out and back in.';
    }

    // Network errors
    if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
        return 'Unable to connect to the server. Please check your internet connection.';
    }

    // AI/API errors
    if (message.includes('GEMINI_API_KEY') || message.includes('AI service configuration')) {
        return 'AI service is not configured correctly on the server.';
    }
    if (message.includes('No content generated') || message.includes('empty response')) {
        return 'The AI could not generate content. Please try with different input.';
    }

    // Keep validation errors as-is
    if (message.includes('required')) {
        return message;
    }

    // Return original message for unknown errors to help with debugging
    return message || 'An unexpected error occurred. Please try again.';
};

// Helper to ensure we have a valid session before calling Edge Functions
const getSessionToken = async (): Promise<string> => {
    console.log('[Auth Debug] Checking session...');

    // First check for existing session
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log('[Auth Debug] getSession result:', {
        hasSession: !!session,
        hasToken: !!session?.access_token,
        error: error?.message
    });

    if (session?.access_token) {
        console.log('[Auth Debug] Using existing session token');
        return session.access_token;
    }

    // Try to refresh if no session found
    console.log('[Auth Debug] No session, attempting refresh...');
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
    console.log('[Auth Debug] refreshSession result:', {
        hasSession: !!refreshData?.session,
        hasToken: !!refreshData?.session?.access_token,
        error: refreshError?.message
    });

    if (refreshData?.session?.access_token) {
        console.log('[Auth Debug] Using refreshed session token');
        return refreshData.session.access_token;
    }

    console.error('[Auth Debug] No valid session found after all attempts');
    throw new Error('Your session has expired. Please refresh the page and try again.');
};

export function useCoverLetter() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
    const [currentLetter, setCurrentLetter] = useState<CoverLetter | null>(null);

    const generateCoverLetter = async (settings: GenerateSettings): Promise<CoverLetter | null> => {
        setLoading(true);
        setError(null);

        try {
            // Get session and token for explicit auth header
            const accessToken = await getSessionToken();

            const { data, error: fnError } = await supabase.functions.invoke('generate-cover-letter', {
                body: settings,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (fnError) throw fnError;
            if (!data?.success) throw new Error(data?.error || 'Generation failed');

            const newLetter = data.coverLetter as CoverLetter;
            setCoverLetters(prev => [newLetter, ...prev]);
            setCurrentLetter(newLetter);
            return newLetter;
        } catch (err: any) {
            setError(getReadableError(err));
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchCoverLetters = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const { data, error: fetchError } = await supabase
                .from('cover_letters')
                .select('*')
                .order('generated_at', { ascending: false });

            if (fetchError) throw fetchError;
            setCoverLetters(data || []);
        } catch (err: any) {
            setError(getReadableError(err));
        } finally {
            setLoading(false);
        }
    };

    const updateCoverLetter = async (id: string, updates: Partial<CoverLetter>): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const { error: updateError } = await supabase
                .from('cover_letters')
                .update(updates)
                .eq('id', id);

            if (updateError) throw updateError;

            setCoverLetters(prev => prev.map(cl => cl.id === id ? { ...cl, ...updates } : cl));
            if (currentLetter?.id === id) {
                setCurrentLetter(prev => prev ? { ...prev, ...updates } : null);
            }
            return true;
        } catch (err: any) {
            setError(getReadableError(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteCoverLetter = async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const { error: deleteError } = await supabase
                .from('cover_letters')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            setCoverLetters(prev => prev.filter(cl => cl.id !== id));
            if (currentLetter?.id === id) {
                setCurrentLetter(null);
            }
            return true;
        } catch (err: any) {
            setError(getReadableError(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (id: string): Promise<boolean> => {
        const letter = coverLetters.find(cl => cl.id === id);
        if (!letter) return false;
        return updateCoverLetter(id, { is_favorite: !letter.is_favorite });
    };

    const exportCoverLetter = async (id: string, format: 'txt' | 'html' | 'docx' = 'html') => {
        setLoading(true);
        setError(null);

        try {
            // Get session and token for explicit auth header
            const accessToken = await getSessionToken();

            const { data, error: fnError } = await supabase.functions.invoke('export-cover-letter', {
                body: { cover_letter_id: id, format },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (fnError) throw fnError;
            if (!data?.success) throw new Error(data?.error || 'Export failed');

            // Handle binary content for DOCX
            let blob: Blob;
            if (format === 'docx' && data.base64Content) {
                // Decode base64 to binary
                const binaryString = atob(data.base64Content);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                blob = new Blob([bytes], { type: data.contentType });
            } else {
                blob = new Blob([data.content], { type: data.contentType });
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = data.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            return true;
        } catch (err: any) {
            setError(getReadableError(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const printAsPdf = () => {
        // This will open print dialog which can "Save as PDF"
        window.print();
    };

    return {
        loading,
        error,
        coverLetters,
        currentLetter,
        setCurrentLetter,
        generateCoverLetter,
        fetchCoverLetters,
        updateCoverLetter,
        deleteCoverLetter,
        toggleFavorite,
        exportCoverLetter,
        printAsPdf,
        clearError: () => setError(null)
    };
}
