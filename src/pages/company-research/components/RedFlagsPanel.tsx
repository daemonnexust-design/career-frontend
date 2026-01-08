import type { RedFlag } from '../types';

interface RedFlagsPanelProps {
  redFlags: RedFlag[];
}

export default function RedFlagsPanel({ redFlags }: RedFlagsPanelProps) {
  const severityConfig = {
    low: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      badge: 'bg-yellow-100 text-yellow-700',
      icon: 'ri-information-line',
      iconColor: 'text-yellow-600'
    },
    medium: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      badge: 'bg-orange-100 text-orange-700',
      icon: 'ri-alert-line',
      iconColor: 'text-orange-600'
    },
    high: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-700',
      icon: 'ri-error-warning-line',
      iconColor: 'text-red-600'
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <i className="ri-information-line text-xl text-orange-600 mt-0.5"></i>
          <p className="text-sm text-orange-900 leading-relaxed">
            These are potential concerns based on sample data. Context and mitigation notes are provided for each item. 
            Always conduct your own research before making decisions.
          </p>
        </div>
      </div>

      {redFlags.map((flag, index) => {
        const config = severityConfig[flag.severity];
        return (
          <div
            key={index}
            className={`${config.bg} border ${config.border} rounded-xl p-5 hover:shadow-md transition-all`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg flex-shrink-0">
                <i className={`${config.icon} text-xl ${config.iconColor}`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h5 className="text-sm font-semibold text-slate-900">{flag.concern}</h5>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase ${config.badge} whitespace-nowrap`}>
                    {flag.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  {flag.context}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
