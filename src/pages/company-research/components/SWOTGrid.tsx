interface SWOTGridProps {
    swot: {
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
    };
}

const Section = ({ title, items, colorClass, icon }: { title: string, items: string[], colorClass: string, icon: string }) => (
    <div className={`p-6 rounded-2xl border ${colorClass} h-full`}>
        <div className="flex items-center gap-2 mb-4">
            <i className={`${icon} text-lg`} />
            <h3 className="font-bold text-sm tracking-wide uppercase">{title}</h3>
        </div>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed opacity-90 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export const SWOTGrid = ({ swot }: SWOTGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section
                title="Strengths"
                items={swot.strengths}
                colorClass="bg-emerald-50/50 border-emerald-100 text-emerald-900"
                icon="ri-boxing-line text-emerald-600"
            />
            <Section
                title="Weaknesses"
                items={swot.weaknesses}
                colorClass="bg-rose-50/50 border-rose-100 text-rose-900"
                icon="ri-close-circle-line text-rose-600"
            />
            <Section
                title="Opportunities"
                items={swot.opportunities}
                colorClass="bg-sky-50/50 border-sky-100 text-sky-900"
                icon="ri-lightbulb-flash-line text-sky-600"
            />
            <Section
                title="Threats"
                items={swot.threats}
                colorClass="bg-amber-50/50 border-amber-100 text-amber-900"
                icon="ri-error-warning-line text-amber-600"
            />
        </div>
    );
};
