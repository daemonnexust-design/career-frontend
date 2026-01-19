interface RiskBannerProps {
    threats: string[];
}

const HIGH_RISK_KEYWORDS = ['layoff', 'bankruptcy', 'lawsuit', 'investigation', 'scandal', 'debt', 'downsizing'];

export const RiskBanner = ({ threats }: RiskBannerProps) => {
    if (!threats || threats.length === 0) return null;

    const criticalThreats = threats.filter(t =>
        HIGH_RISK_KEYWORDS.some(k => t.toLowerCase().includes(k))
    );

    if (criticalThreats.length === 0) return null;

    return (
        <div className="rounded-2xl bg-red-50/90 border border-red-200 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 rounded-full shrink-0">
                    <i className="ri-alarm-warning-fill text-red-600 text-lg" />
                </div>
                <div>
                    <h3 className="text-red-900 font-bold text-sm uppercase tracking-wider mb-1">Critical Risk Factors</h3>
                    <ul className="space-y-1">
                        {criticalThreats.map((threat, i) => (
                            <li key={i} className="text-red-700 text-sm leading-relaxed flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-red-500" />
                                {threat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
