
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import Card from '../../../components/ui/Card';

interface CVData {
    id: string;
    original_filename: string;
    uploaded_at: string;
}

export default function CVWidget() {
    const [cv, setCV] = useState<CVData | null>(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        fetchCV();
    }, []);

    const fetchCV = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('user_cvs')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (data) {
                setCV(data);
            }
        } catch (error) {
            console.error('Error fetching CV for widget:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            setDownloading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase.functions.invoke('download-cv', {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });

            if (error) throw error;
            if (data?.signedUrl) {
                window.open(data.signedUrl, '_blank');
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download CV');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <Card className="flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className="ri-file-user-line text-8xl text-white transform rotate-12 translate-x-4 -translate-y-4"></i>
            </div>

            <div className="relative z-10 flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                        <i className="ri-file-text-line text-accent-yellow"></i>
                        Active CV
                    </h3>
                    {cv && (
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 flex items-center gap-1">
                            <i className="ri-checkbox-circle-fill"></i>
                            Ready
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center min-h-[120px]">
                        <div className="w-8 h-8 border-2 border-accent-yellow border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : cv ? (
                    <div className="space-y-4">

                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-lg border border-white/5 flex items-center justify-center shadow-sm flex-shrink-0">
                                <i className="ri-file-pdf-line text-red-400 text-xl"></i>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-white truncate" title={cv.original_filename}>
                                    {cv.original_filename}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Uploaded {new Date(cv.uploaded_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleDownload}
                                disabled={downloading}
                                className="flex-1 py-2 px-3 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                {downloading ? (
                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <i className="ri-download-line"></i>
                                        Download
                                    </>
                                )}
                            </button>
                            <Link
                                to="/upload-cv"
                                className="flex-1 py-2 px-3 bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20 text-sm font-medium rounded-full hover:bg-accent-yellow/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <i className="ri-pencil-line"></i>
                                Update
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] text-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                            <i className="ri-upload-cloud-2-line text-2xl text-gray-500"></i>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">No CV uploaded yet</p>
                        <Link
                            to="/upload-cv"
                            className="py-2 px-4 btn-primary text-sm font-medium flex items-center gap-2"
                        >
                            Upload Now
                            <i className="ri-arrow-right-line"></i>
                        </Link>
                    </div>
                )}
            </div>
        </Card>
    );
}
