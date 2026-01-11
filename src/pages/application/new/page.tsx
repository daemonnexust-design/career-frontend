import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import { useAIAssessment } from '@/hooks/useAIAssessment';
import { useAuth } from '@/hooks/useAuth';
import { useGmailConnection } from '@/hooks/useGmailConnection';
import { supabase } from '@/lib/supabase';
import { AIAssessmentResult } from '@/components/ai/AIAssessmentResult';

type Step = 'JOB_DETAILS' | 'ANALYSIS' | 'OPTIMIZATION' | 'FINALIZE';

export default function NewApplicationPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isConnected: isGmailConnected, connectGmail } = useGmailConnection();
    const { assessCandidate, loading: aiLoading, result: aiResult, error: aiError } = useAIAssessment();

    const [currentStep, setCurrentStep] = useState<Step>('JOB_DETAILS');
    const [jobDetails, setJobDetails] = useState({
        role: '',
        companyUrl: '',
        description: ''
    });
    const [cvText, setCvText] = useState('');
    const [cvLoading, setCvLoading] = useState(true);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizedCvText, setOptimizedCvText] = useState('');
    const [optimizationChanges, setOptimizationChanges] = useState<string[]>([]);
    const [optimizationError, setOptimizationError] = useState<string | null>(null);

    // Fetch user's existing CV text on mount
    useEffect(() => {
        const fetchCV = async () => {
            if (!user) {
                // If auth is not loading but no user, we can stop loading CV
                setCvLoading(false);
                return;
            };

            try {
                const { data, error } = await supabase
                    .from('user_cvs')
                    .select('cv_text')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (data?.cv_text) {
                    setCvText(data.cv_text);
                }
            } catch (err) {
                console.error('Error fetching CV:', err);
            } finally {
                setCvLoading(false);
            }
        };
        fetchCV();
    }, [user]);

    const handleNext = async () => {
        if (!cvText) return;

        try {
            setCurrentStep('ANALYSIS');
            await assessCandidate({
                cv_text: cvText,
                job_description: jobDetails.description,
                candidate_name: user?.user_metadata?.full_name || user?.email?.split('@')[0]
            });
        } catch (err: any) {
            console.error('Analysis failed:', err);
        }
    };

    const handleUpgradeScore = async () => {
        try {
            setCurrentStep('OPTIMIZATION');
            setIsOptimizing(true);
            setOptimizationError(null);

            const response = await supabase.functions.invoke('optimize-cv', {
                body: {
                    cv_text: cvText,
                    job_description: jobDetails.description
                }
            });

            if (response.error) {
                console.error('Optimization response error:', response.error);
                throw new Error(response.error.message || 'Optimization failed');
            }

            setOptimizedCvText(response.data.optimized_text);
            setOptimizationChanges(response.data.changes_summary || []);
            setCurrentStep('FINALIZE');
        } catch (error: any) {
            console.error('Optimization failed:', error);
            setOptimizationError(error.message || 'Failed to optimize CV. Please try again.');
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleGenerateCoverLetter = () => {
        // Navigate to cover letter page with pre-filled data
        navigate('/cover-letter', {
            state: {
                jobDescription: jobDetails.description,
                cvText: optimizedCvText || cvText,
                generatedContent: aiResult?.cover_letter
            }
        });
    };

    const handleSendGmail = () => {
        if (!isGmailConnected) {
            if (confirm('You need to connect your Gmail first. Connect now?')) {
                connectGmail();
            }
            return;
        }
        // Navigate to email control with pre-filled data
        navigate('/email-control', {
            state: {
                subject: `Application for ${jobDetails.role} at ${jobDetails.companyUrl.replace('https://', '').split('/')[0] || 'your company'}`,
                body: aiResult?.email_draft || '',
                recipient: ''
            }
        });
    };

    const renderStepIndicator = () => {

        const steps: { label: string; icon: string; id: Step }[] = [
            { label: 'Details', icon: 'ri-briefcase-line', id: 'JOB_DETAILS' },
            { label: 'Analysis', icon: 'ri-bar-chart-box-line', id: 'ANALYSIS' },
            { label: 'Optimize', icon: 'ri-magic-line', id: 'OPTIMIZATION' },
            { label: 'Finalize', icon: 'ri-flag-line', id: 'FINALIZE' }
        ];

        return (
            <div className="flex items-center justify-center mb-12">
                {steps.map((s, idx) => (
                    <div key={s.id} className="flex items-center">
                        <div className={`flex flex-col items-center relative ${currentStep === s.id ? 'text-teal-600' : 'text-slate-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${currentStep === s.id ? 'border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/20' : 'border-slate-200 bg-white'
                                }`}>
                                <i className={s.icon}></i>
                            </div>
                            <span className="text-xs font-medium mt-2 absolute -bottom-6 whitespace-nowrap">{s.label}</span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`w-12 h-0.5 mx-2 ${idx < steps.findIndex(st => st.id === currentStep) ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900">New Application</h1>
                        <p className="text-slate-600 mt-2">Tailor your profile for your dream role in minutes</p>
                    </div>

                    {renderStepIndicator()}

                    {/* Step Content */}
                    <div className="mt-8">
                        {currentStep === 'JOB_DETAILS' && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <i className="ri-briefcase-line text-teal-600"></i>
                                    Job Details
                                </h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Job Role / Title</label>
                                            <input
                                                type="text"
                                                value={jobDetails.role}
                                                onChange={(e) => setJobDetails({ ...jobDetails, role: e.target.value })}
                                                placeholder="e.g. Senior Software Engineer"
                                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Company Website (Optional)</label>
                                            <input
                                                type="url"
                                                value={jobDetails.companyUrl}
                                                onChange={(e) => setJobDetails({ ...jobDetails, companyUrl: e.target.value })}
                                                placeholder="https://company.com"
                                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Job Description</label>
                                        <textarea
                                            rows={8}
                                            value={jobDetails.description}
                                            onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
                                            placeholder="Paste the full job description here..."
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"
                                        />
                                    </div>
                                    {!cvLoading && !cvText && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                            <i className="ri-information-line text-xl text-amber-600"></i>
                                            <div className="text-sm">
                                                <p className="font-semibold text-amber-900">Missing CV Profile</p>
                                                <p className="text-amber-800">Please <Link to="/upload-cv" className="underline font-bold">upload a CV</Link> or add your profile text in settings before analyzing.</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-end pt-4">
                                        <button
                                            onClick={handleNext}
                                            disabled={cvLoading || !jobDetails.role || !jobDetails.description || !cvText}
                                            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {cvLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                            Analyze Match
                                            <i className="ri-arrow-right-line ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 'ANALYSIS' && (
                            <div className="space-y-6">
                                {aiLoading ? (
                                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-soft">
                                        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                                        <h3 className="text-xl font-semibold text-slate-900">Analyzing Your Match</h3>
                                        <p className="text-slate-500 mt-2">Comparing your profile with the job requirements...</p>
                                    </div>
                                ) : aiResult ? (
                                    <>
                                        <AIAssessmentResult data={aiResult} onReset={() => setCurrentStep('JOB_DETAILS')} />
                                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
                                            <div>
                                                <h4 className="font-semibold text-slate-900">Want to increase your score?</h4>
                                                <p className="text-sm text-slate-500">Our AI can optimize your bullet points to match these keywords better.</p>
                                            </div>
                                            <button
                                                onClick={handleUpgradeScore}
                                                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                            >
                                                <i className="ri-magic-line"></i>
                                                Upgrade Score
                                            </button>
                                        </div>
                                    </>
                                ) : aiError ? (
                                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                                        <i className="ri-error-warning-line text-4xl text-red-500 mb-4 block"></i>
                                        <h3 className="text-lg font-semibold text-red-900">Analysis Failed</h3>
                                        <p className="text-red-700 mt-1">{aiError.message}</p>
                                        <button
                                            onClick={() => setCurrentStep('JOB_DETAILS')}
                                            className="mt-6 px-6 py-2 bg-white border border-red-200 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        )}

                        {currentStep === 'OPTIMIZATION' && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <i className="ri-magic-line text-teal-600"></i>
                                    CV Optimization
                                </h2>
                                <div className="space-y-6 text-center">
                                    <div className="p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                        <i className="ri-sparkling-2-line text-5xl text-teal-500 mb-4 block"></i>
                                        <h3 className="text-lg font-semibold text-slate-900">AI Rewrite in Progress</h3>
                                        <p className="text-slate-500 mt-2 mb-8 max-w-md mx-auto">
                                            We'll rewrite your CV bullet points to better align with the job's key requirements while maintaining accuracy.
                                        </p>
                                        <div
                                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 flex items-center gap-2 mx-auto justify-center"
                                        >
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Optimizing Your CV...
                                        </div>

                                        {optimizationError && (
                                            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
                                                <i className="ri-error-warning-line text-lg"></i>
                                                {optimizationError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 'FINALIZE' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold flex items-center gap-2">
                                            <i className="ri-checkbox-circle-line text-emerald-500"></i>
                                            Optimized CV Ready
                                        </h2>
                                        <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1">
                                            <i className="ri-download-2-line"></i>
                                            Download DOCX
                                        </button>
                                    </div>

                                    <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 max-h-[400px] overflow-y-auto mb-6">
                                        {optimizedCvText || cvText}
                                    </div>

                                    {optimizationChanges.length > 0 && (
                                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
                                            <h4 className="text-sm font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                                                <i className="ri-magic-line"></i>
                                                AI Improvements:
                                            </h4>
                                            <ul className="text-sm text-emerald-800 space-y-1">
                                                {optimizationChanges.map((change, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <i className="ri-check-line mt-0.5"></i>
                                                        {change}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={handleGenerateCoverLetter}
                                            className="p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 group"
                                        >
                                            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <i className="ri-quill-pen-line"></i>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">Cover Letter</p>
                                                <p className="text-xs text-slate-500">Generate tailored letter</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={handleSendGmail}
                                            className={`p-4 border rounded-xl transition-all flex items-center gap-4 group ${isGmailConnected
                                                ? 'bg-white border-slate-200 hover:bg-slate-50'
                                                : 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${isGmailConnected ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-600 text-white'
                                                }`}>
                                                <i className={isGmailConnected ? 'ri-mail-send-line' : 'ri-google-line'}></i>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">
                                                    {isGmailConnected ? 'Send with Gmail' : 'Connect Gmail'}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {isGmailConnected ? 'Open in Gmail draft' : 'Required to send email'}
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
