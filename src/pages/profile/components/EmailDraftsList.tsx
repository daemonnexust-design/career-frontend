import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface EmailDraft {
    id: string;
    subject: string;
    status: 'draft' | 'scheduled' | 'sent';
    created_at: string;
    sent_at?: string;
}

export function EmailDraftsList() {
    const { user } = useAuth();
    const [drafts, setDrafts] = useState<EmailDraft[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) fetchDrafts();
    }, [user]);

    const fetchDrafts = async () => {
        try {
            const { data, error } = await supabase
                .from('email_drafts')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDrafts(data || []);
        } catch (error) {
            console.error('Error fetching drafts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, status: string) => {
        // Double check policy on frontend for UX (already enforced by RLS potentially, or policy says "Users can DELETE drafts only if status != 'sent'")
        if (status === 'sent') {
            alert('Cannot delete sent emails due to audit requirements.');
            return;
        }

        if (!confirm('Delete this draft?')) return;

        try {
            const { error } = await supabase
                .from('email_drafts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setDrafts(drafts.filter(d => d.id !== id));
        } catch (error) {
            console.error('Error deleting draft:', error);
            alert('Failed to delete draft');
        }
    };

    if (loading) return <div className="text-gray-500 text-sm">Loading drafts...</div>;

    if (drafts.length === 0) {
        return (
            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                No email drafts found.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {drafts.map((draft) => (
                <div key={draft.id} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                    <div>
                        <h3 className="font-medium text-gray-900">{draft.subject || '(No Subject)'}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${draft.status === 'sent' ? 'bg-green-100 text-green-700' :
                                    draft.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'
                                }`}>
                                {draft.status.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                                {new Date(draft.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {draft.status !== 'sent' && (
                        <button
                            onClick={() => handleDelete(draft.id, draft.status)}
                            className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                            title="Delete Draft"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
