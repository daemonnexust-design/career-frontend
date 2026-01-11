import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface GmailConnectionState {
    isConnected: boolean;
    email: string | null;
    loading: boolean;
    error: string | null;
}

export const useGmailConnection = () => {
    const [state, setState] = useState<GmailConnectionState>({
        isConnected: false,
        email: null,
        loading: true,
        error: null,
    });

    // Check connection status
    const checkConnection = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setState({ isConnected: false, email: null, loading: false, error: null });
                return;
            }

            // Check if user has Gmail tokens stored
            const { data, error } = await supabase
                .from('user_gmail_tokens')
                .select('gmail_email, expires_at')
                .eq('user_id', user.id)
                .maybeSingle();

            if (error) {
                console.error('Error checking Gmail connection:', error);
                setState({ isConnected: false, email: null, loading: false, error: null });
                return;
            }

            if (data) {
                setState({
                    isConnected: true,
                    email: data.gmail_email,
                    loading: false,
                    error: null,
                });
            } else {
                setState({ isConnected: false, email: null, loading: false, error: null });
            }
        } catch (err: any) {
            console.error('Gmail connection check error:', err);
            setState({ isConnected: false, email: null, loading: false, error: err.message });
        }
    }, []);

    // Connect Gmail - triggers OAuth with gmail.send scope
    const connectGmail = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/email-control?gmail_callback=true`,
                    scopes: 'https://www.googleapis.com/auth/gmail.send',
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });

            if (error) throw error;
        } catch (err: any) {
            setState(prev => ({ ...prev, loading: false, error: err.message }));
        }
    }, []);

    // Capture tokens after OAuth callback
    const captureTokens = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const { data: { session } } = await supabase.auth.getSession();

            if (!session?.provider_token) {
                console.log('No provider token in session');
                return false;
            }

            // Call Edge Function to store tokens
            const { data, error } = await supabase.functions.invoke('connect-gmail');

            if (error) throw error;

            if (data?.success) {
                setState({
                    isConnected: true,
                    email: data.email,
                    loading: false,
                    error: null,
                });
                return true;
            }

            return false;
        } catch (err: any) {
            console.error('Token capture error:', err);
            setState(prev => ({ ...prev, loading: false, error: err.message }));
            return false;
        }
    }, []);

    // Disconnect Gmail
    const disconnectGmail = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // We can't delete directly due to RLS, so we need an Edge Function
            // For now, we'll just clear the local state
            // In production, you'd want a disconnect-gmail Edge Function

            setState({ isConnected: false, email: null, loading: false, error: null });
        } catch (err: any) {
            setState(prev => ({ ...prev, loading: false, error: err.message }));
        }
    }, []);

    // Check connection on mount
    useEffect(() => {
        checkConnection();
    }, [checkConnection]);

    // Handle OAuth callback
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('gmail_callback') === 'true') {
            // Clean up URL
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);

            // Capture tokens
            captureTokens();
        }
    }, [captureTokens]);

    return {
        ...state,
        connectGmail,
        disconnectGmail,
        refreshStatus: checkConnection,
    };
};
