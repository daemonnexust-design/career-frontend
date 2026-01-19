import { CompanyInsight } from '../../../hooks/useCompanyResearch';

interface HeroCardProps {
    url: string;
    strategicFocus: string;
    cultureValues: string[];
}

export const HeroCard = ({ url, strategicFocus, cultureValues }: HeroCardProps) => {
    // Extract domain for display
    const domain = new URL(url).hostname.replace('www.', '');

    return (
        <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl p-6 md:p-8 group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/50 border border-slate-200 text-xs font-semibold text-slate-600 mb-3">
                        <i className="ri-building-line" />
                        {domain.toUpperCase()}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                        {strategicFocus || "Analyzing Strategic Focus..."}
                    </h1>
                </div>

                {cultureValues && cultureValues.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {cultureValues.map((val, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                                {val}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
