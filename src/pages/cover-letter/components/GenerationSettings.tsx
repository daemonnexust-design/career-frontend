import { useState, useRef } from 'react';

interface GenerationSettingsProps {
    onGenerate: (settings: {
        job_description: string;
        company_name: string;
        position: string;
        company_values?: string;
        tone: 'professional' | 'enthusiastic' | 'creative';
    }) => void;
    loading?: boolean;
    cvText?: string;
}

export default function GenerationSettings({ onGenerate, loading = false, cvText }: GenerationSettingsProps) {
    const [jobDescription, setJobDescription] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [companyValues, setCompanyValues] = useState('');
    const [tone, setTone] = useState<'professional' | 'enthusiastic' | 'creative'>('professional');

    const tones = [
        { value: 'professional', label: 'Professional', icon: 'ri-briefcase-line', desc: 'Formal & polished' },
        { value: 'enthusiastic', label: 'Enthusiastic', icon: 'ri-heart-line', desc: 'Warm & passionate' },
        { value: 'creative', label: 'Creative', icon: 'ri-lightbulb-line', desc: 'Original & memorable' }
    ];

    const handleSubmit = () => {
        if (!jobDescription.trim() || !companyName.trim() || !position.trim()) return;
        onGenerate({
            job_description: jobDescription,
            company_name: companyName,
            position,
            company_values: companyValues || undefined,
            tone
        });
    };

    const isValid = jobDescription.trim() && companyName.trim() && position.trim();
    const hasCv = cvText && cvText.trim().length > 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <i className="ri-magic-line text-xl text-white"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Smart Customization</h3>
                        <p className="text-sm text-white/80">Personalize your cover letter</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* CV Status Indicator */}
                {hasCv ? (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                        <i className="ri-check-double-line text-green-600 text-xl"></i>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-green-800">CV loaded for personalization</p>
                            <p className="text-xs text-green-600">Your experience will be highlighted in the cover letter</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <i className="ri-information-line text-amber-600 text-xl"></i>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-amber-800">No CV uploaded</p>
                            <p className="text-xs text-amber-600">Upload your CV above for a more personalized cover letter</p>
                        </div>
                    </div>
                )}

                {/* Company & Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name *</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Google"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Position *</label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="e.g. Senior Software Engineer"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Job Description */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description *</label>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here..."
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none"
                    />
                </div>

                {/* Company Values (Optional) */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Company Values / Philosophy
                        <span className="text-slate-400 font-normal ml-2">(Optional)</span>
                    </label>
                    <textarea
                        value={companyValues}
                        onChange={(e) => setCompanyValues(e.target.value)}
                        placeholder="Describe the company's culture, mission, or values..."
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        <i className="ri-information-line mr-1"></i>
                        Adding company values helps create a more culturally-aligned cover letter.
                    </p>
                </div>

                {/* Tone Selector */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Writing Tone</label>
                    <div className="grid grid-cols-3 gap-3">
                        {tones.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTone(t.value as any)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${tone === t.value
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${tone === t.value ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    <i className={t.icon}></i>
                                </div>
                                <p className={`text-sm font-semibold ${tone === t.value ? 'text-purple-900' : 'text-slate-900'}`}>
                                    {t.label}
                                </p>
                                <p className="text-xs text-slate-500">{t.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!isValid || loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating...
                        </>
                    ) : (
                        <>
                            <i className="ri-sparkling-2-line text-xl"></i>
                            Generate Cover Letter
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
