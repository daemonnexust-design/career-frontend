import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function DangerZone() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [confirmInput, setConfirmInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteAccount = async () => {
        if (confirmInput !== 'DELETE MY ACCOUNT') return;

        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase.functions.invoke('delete-account', {
                body: { confirmation: confirmInput }
            });

            if (error) throw error;

            // Account deleted. Sign out and redirect.
            await signOut();
            navigate('/');

        } catch (err: any) {
            setError(err.message || 'Failed to delete account');
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors text-sm"
            >
                Delete Account
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account?</h3>
                        <div className="p-4 bg-red-50 rounded-lg mb-4 text-red-800 text-sm">
                            <p className="font-bold">Warning: This action is irreversible.</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>All your profile data will be permanently deleted.</li>
                                <li>Your CV and generated documents will be removed.</li>
                                <li>You will lose access to all email drafts.</li>
                            </ul>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            To confirm, please type <strong>DELETE MY ACCOUNT</strong> below:
                        </p>

                        <input
                            type="text"
                            value={confirmInput}
                            onChange={(e) => setConfirmInput(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 uppercase"
                            placeholder="DELETE MY ACCOUNT"
                        />

                        {error && (
                            <div className="text-red-600 text-sm mb-4">{error}</div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={confirmInput !== 'DELETE MY ACCOUNT' || loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {loading ? 'Deleting...' : 'Permanently Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
