
import Card from '../../../components/ui/Card';

export default function AnalyticsSummary() {
    const stats = [
        {
            label: 'Applications',
            value: '0',
            icon: 'ri-send-plane-fill',
            color: 'text-accent-cyan',
            bg: 'bg-accent-cyan/10',
            gradient: 'from-cyan-500/20 to-blue-500/10',
            illustration: (
                <svg className="absolute right-0 bottom-0 w-24 h-24 opacity-10 text-cyan-400" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80L50 20L80 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" cy="20" r="8" fill="currentColor" opacity="0.5" />
                    <path d="M30 60L50 30L70 60" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                    <path d="M10 70L30 50M70 50L90 70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                </svg>
            )
        },
        {
            label: 'Interviews',
            value: '0',
            icon: 'ri-calendar-event-fill',
            color: 'text-accent-purple',
            bg: 'bg-accent-purple/10',
            gradient: 'from-purple-500/20 to-pink-500/10',
            illustration: (
                <svg className="absolute right-0 bottom-0 w-24 h-24 opacity-10 text-purple-400" viewBox="0 0 100 100" fill="none">
                    <rect x="20" y="25" width="60" height="55" rx="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 40H80" stroke="currentColor" strokeWidth="2" />
                    <path d="M35 20V30M65 20V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="40" cy="55" r="4" fill="currentColor" opacity="0.6" />
                    <circle cx="60" cy="55" r="4" fill="currentColor" opacity="0.4" />
                    <circle cx="40" cy="70" r="4" fill="currentColor" opacity="0.3" />
                </svg>
            )
        },
        {
            label: 'Offers',
            value: '0',
            icon: 'ri-trophy-fill',
            color: 'text-accent-yellow',
            bg: 'bg-accent-yellow/10',
            gradient: 'from-yellow-500/20 to-orange-500/10',
            illustration: (
                <svg className="absolute right-0 bottom-0 w-24 h-24 opacity-10 text-yellow-400" viewBox="0 0 100 100" fill="none">
                    <path d="M50 15L55 35H75L60 48L65 68L50 55L35 68L40 48L25 35H45L50 15Z" fill="currentColor" opacity="0.3" />
                    <path d="M50 15L55 35H75L60 48L65 68L50 55L35 68L40 48L25 35H45L50 15Z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="50" cy="80" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                    <path d="M35 85L50 80L65 85" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                </svg>
            )
        },
        {
            label: 'Response Rate',
            value: '0%',
            icon: 'ri-bar-chart-fill',
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
            gradient: 'from-emerald-500/20 to-teal-500/10',
            illustration: (
                <svg className="absolute right-0 bottom-0 w-24 h-24 opacity-10 text-emerald-400" viewBox="0 0 100 100" fill="none">
                    <rect x="15" y="60" width="12" height="25" rx="2" fill="currentColor" opacity="0.4" />
                    <rect x="32" y="45" width="12" height="40" rx="2" fill="currentColor" opacity="0.5" />
                    <rect x="49" y="30" width="12" height="55" rx="2" fill="currentColor" opacity="0.6" />
                    <rect x="66" y="20" width="12" height="65" rx="2" fill="currentColor" opacity="0.7" />
                    <path d="M15 55L35 40L55 25L80 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                </svg>
            )
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className="relative overflow-hidden flex flex-col items-center text-center min-h-[140px] justify-center"
                    hoverEffect
                >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />

                    {/* Contextual illustration */}
                    {stat.illustration}

                    {/* Content */}
                    <div className="relative z-10">
                        <span className="text-3xl font-bold text-white block">{stat.value}</span>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}
