import { useState } from 'react';
import { AIAssessmentResponse } from '@/types/ai';

interface Props {
    data: AIAssessmentResponse;
    onReset: () => void;
}

export function AIAssessmentResult({ data, onReset }: Props) {
    // Tab state for Mobile, Split view for Desktop
    const [activeTab, setActiveTab] = useState<'overview' | 'cover_letter' | 'email'>('overview');
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getMatchBadge = (level: string) => {
        switch (level) {
            case 'strong': return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">Strong Match</span>;
            case 'fair': return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">Fair Match</span>;
            default: return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">Poor Match</span>;
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <i className="ri-sparkling-fill text-teal-500"></i>
                        AI Assessment Result
                    </h2>

                </div>
                <button
                    onClick={onReset}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                >
                    Start New Assessment
                </button>
            </div>

            <div className="flex flex-col lg:flex-row h-auto lg:h-[600px]">

                {/* LEFT PANE: Score & Reasoning (Always visible on Desktop) */}
                <div className={`flex-1 p-8 overflow-y-auto ${activeTab !== 'overview' && 'hidden lg:block'}`}>
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Qualification Score</span>
                            <div className={`text-6xl font-black ${getScoreColor(data.qualification_score).split(' ')[0]}`}>
                                {data.qualification_score}
                                <span className="text-3xl text-slate-300 font-medium">/100</span>
                            </div>
                        </div>
                        {getMatchBadge(data.match_level)}
                    </div>

                    {/* Warnings / Red Flags */}
                    {data.warnings.length > 0 && (
                        <div className="mb-8 p-4 bg-red-50 rounded-2xl border border-red-100">
                            <h4 className="flex items-center gap-2 text-red-800 font-bold mb-3 text-sm uppercase tracking-wide">
                                <i className="ri-alarm-warning-fill"></i>
                                Attention Required
                            </h4>
                            <ul className="space-y-2">
                                {data.warnings.map((warn, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                                        <i className="ri-arrow-right-s-fill mt-0.5 opacity-50"></i>
                                        {warn}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Reasoning */}
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <i className="ri-list-check text-teal-500"></i>
                        Analysis Breakdown
                    </h4>
                    <ul className="space-y-3 mb-8">
                        {data.reasoning.map((point, i) => (
                            <li key={i} className="p-4 bg-slate-50 rounded-xl text-slate-700 text-sm leading-relaxed border border-slate-100">
                                {point}
                            </li>
                        ))}
                    </ul>

                    {/* Improvement Suggestions */}
                    {data.improvement_suggestions && data.improvement_suggestions.length > 0 && (
                        <div className="mb-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                            <h4 className="flex items-center gap-2 text-indigo-900 font-bold mb-4">
                                <i className="ri-lightbulb-flash-line text-indigo-500 text-xl"></i>
                                Improvement Suggestions
                            </h4>
                            <ul className="space-y-3">
                                {data.improvement_suggestions.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-indigo-800 leading-relaxed bg-white/60 p-3 rounded-lg border border-indigo-100/50">
                                        <span className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-indigo-500 font-bold text-xs shadow-sm border border-indigo-100">
                                            {i + 1}
                                        </span>
                                        <span className="mt-0.5">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* MOBILE TABS (Hidden on Desktop) */}
                <div className="lg:hidden flex border-b border-slate-100 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 py-3 px-4 text-sm font-bold whitespace-nowrap ${activeTab === 'overview' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500'}`}
                    >
                        Score & Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('cover_letter')}
                        disabled={!data.cover_letter}
                        className={`flex-1 py-3 px-4 text-sm font-bold whitespace-nowrap ${activeTab === 'cover_letter' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500'} ${!data.cover_letter && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Cover Letter
                    </button>
                    <button
                        onClick={() => setActiveTab('email')}
                        disabled={!data.email_draft}
                        className={`flex-1 py-3 px-4 text-sm font-bold whitespace-nowrap ${activeTab === 'email' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500'} ${!data.email_draft && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Email Draft
                    </button>
                </div>

                {/* RIGHT PANE: Generated Content (Conditional on Mobile, Split on Desktop) */}
                <div className="lg:w-[500px] lg:border-l lg:border-slate-100 bg-slate-50/50 flex flex-col h-full overflow-hidden">

                    {/* Content Selector (Desktop Only) */}
                    <div className="hidden lg:flex p-4 gap-2 border-b border-slate-100 bg-white">
                        <button
                            onClick={() => setActiveTab('cover_letter')}
                            disabled={!data.cover_letter}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'cover_letter' || activeTab === 'overview' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'} ${!data.cover_letter && 'opacity-50 cursor-not-allowed'}`}
                        >
                            Cover Letter
                        </button>
                        <button
                            onClick={() => setActiveTab('email')}
                            disabled={!data.email_draft}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'email' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'} ${!data.email_draft && 'opacity-50 cursor-not-allowed'}`}
                        >
                            Email Draft
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                        {(activeTab === 'cover_letter' || (activeTab === 'overview' && window.innerWidth >= 1024)) && data.cover_letter ? (
                            <div className="bg-white p-8 shadow-sm border border-slate-200 rounded-xl">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generated Letter</span>
                                    <button
                                        onClick={() => copyToClipboard(data.cover_letter!, 'cl')}
                                        className="text-teal-600 hover:text-teal-700 text-sm font-bold flex items-center gap-1"
                                    >
                                        {copied === 'cl' ? <><i className="ri-check-line"></i> Copied</> : <><i className="ri-file-copy-line"></i> Copy</>}
                                    </button>
                                </div>
                                <div
                                    className="prose prose-slate prose-sm max-w-none font-serif leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.cover_letter }}
                                />
                            </div>
                        ) : activeTab === 'email' && data.email_draft ? (
                            <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-xl relative">
                                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(data.email_draft!, 'email')}
                                        className="text-teal-600 hover:text-teal-700 text-sm font-bold flex items-center gap-1"
                                    >
                                        {copied === 'email' ? <><i className="ri-check-line"></i> Copied</> : <><i className="ri-file-copy-line"></i> Copy</>}
                                    </button>
                                </div>
                                <pre className="font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                                    {data.email_draft}
                                </pre>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="ri-ghost-line text-2xl"></i>
                                </div>
                                <p className="font-medium">Content not generated for this score range.</p>
                                <p className="text-xs mt-2 opacity-70">Qualification score must be &ge; 40</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
