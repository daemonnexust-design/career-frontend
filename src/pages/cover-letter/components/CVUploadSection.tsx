import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface CVUploadSectionProps {
    cvText: string;
    cvFilename?: string;
    onCVUploaded: (text: string, filename: string) => void;
    userId: string;
    loading?: boolean;
}

export default function CVUploadSection({
    cvText,
    cvFilename,
    onCVUploaded,
    userId,
    loading = false
}: CVUploadSectionProps) {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadFileWithText = async (file: File, text: string) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Not authenticated');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('cv_text', text);

        const { data, error } = await supabase.functions.invoke('upload-cv', {
            body: formData,
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        });

        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || 'Upload failed');

        return data.data;
    };

    const handleFile = useCallback(async (file: File) => {
        setUploading(true);
        setError(null);

        try {
            const allowedTypes = ['text/plain', 'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

            if (!allowedTypes.includes(file.type) && !file.name.match(/\.(txt|pdf|doc|docx)$/i)) {
                throw new Error('Please upload a PDF, DOC, DOCX, or TXT file');
            }

            if (file.size > 5 * 1024 * 1024) {
                throw new Error('File size must be less than 5MB');
            }

            let text = '';
            const extension = file.name.split('.').pop()?.toLowerCase();
            if (extension === 'txt') {
                text = await file.text();
            } else {
                text = `[CV File: ${file.name}]\n\nPlease enter your CV text manually or use a TXT file for best results.`;
            }

            await uploadFileWithText(file, text);

            onCVUploaded(text, file.name);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    }, [userId, onCVUploaded]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragOver(false);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const hasCv = cvText && cvText.trim().length > 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <i className="ri-file-user-line text-xl text-white"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Your CV</h3>
                        <p className="text-sm text-white/80">Upload for personalized cover letters</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {hasCv ? (
                    /* CV Uploaded State */
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <i className="ri-check-line text-xl text-white"></i>
                            </div>
                            <div>
                                <p className="font-semibold text-green-900">CV Ready</p>
                                <p className="text-sm text-green-700">{cvFilename || 'CV uploaded'}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading || loading}
                            className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            <i className="ri-refresh-line mr-1"></i>
                            Change
                        </button>
                    </div>
                ) : (
                    /* Upload Area */
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-slate-600">Processing your CV...</p>
                            </div>
                        ) : (
                            <>
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="ri-upload-cloud-2-line text-2xl text-blue-600"></i>
                                </div>
                                <p className="font-semibold text-slate-900 mb-1">
                                    Drag & drop your CV here
                                </p>
                                <p className="text-sm text-slate-500 mb-3">
                                    or click to browse
                                </p>
                                <div className="flex justify-center gap-2 text-xs text-slate-400">
                                    <span className="px-2 py-1 bg-slate-100 rounded">PDF</span>
                                    <span className="px-2 py-1 bg-slate-100 rounded">DOC</span>
                                    <span className="px-2 py-1 bg-slate-100 rounded">DOCX</span>
                                    <span className="px-2 py-1 bg-slate-100 rounded">TXT</span>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
                        <i className="ri-error-warning-line"></i>
                        {error}
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>
        </div>
    );
}
