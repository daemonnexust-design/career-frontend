import { ReactNode } from 'react';

interface InsightSectionProps {
  title: string;
  type: 'facts' | 'guidance';
  icon: string;
  isExpanded: boolean;
  onToggle: () => void;
  attribution: string;
  children: ReactNode;
}

export default function InsightSection({
  title,
  type,
  icon,
  isExpanded,
  onToggle,
  attribution,
  children
}: InsightSectionProps) {
  const typeStyles = {
    facts: {
      bg: 'from-blue-50 to-slate-50',
      border: 'border-blue-200',
      iconBg: 'from-blue-500 to-blue-600',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      hoverBorder: 'hover:border-blue-300'
    },
    guidance: {
      bg: 'from-amber-50 to-orange-50',
      border: 'border-amber-200',
      iconBg: 'from-amber-500 to-orange-600',
      badge: 'bg-amber-100 text-amber-700 border-amber-200',
      hoverBorder: 'hover:border-amber-300'
    }
  };

  const styles = typeStyles[type];

  return (
    <div className="relative group">
      <div className={`absolute -inset-1 bg-gradient-to-r ${type === 'facts' ? 'from-blue-400 to-blue-500' : 'from-amber-400 to-orange-500'} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity`}></div>
      <div className={`relative bg-gradient-to-br ${styles.bg} border-2 ${styles.border} ${styles.hoverBorder} rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden`}>
        {/* Header */}
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-white/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${styles.iconBg} rounded-xl shadow-md`}>
              <i className={`${icon} text-2xl text-white`}></i>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <div className={`inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 ${styles.badge} border rounded-full text-xs font-semibold uppercase tracking-wide`}>
                {type === 'facts' ? (
                  <>
                    <i className="ri-file-list-line"></i>
                    <span>Objective Facts</span>
                  </>
                ) : (
                  <>
                    <i className="ri-compass-line"></i>
                    <span>Guidance</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-2xl text-slate-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
          </div>
        </button>

        {/* Content */}
        {isExpanded && (
          <div className="px-6 pb-6 animate-fade-in">
            <div className="pt-4 border-t-2 border-slate-200">
              {children}
            </div>
            
            {/* Attribution */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-2 text-xs text-slate-600">
                <i className="ri-information-line text-sm flex-shrink-0 mt-0.5"></i>
                <span className="leading-relaxed">
                  <strong className="font-semibold">Source:</strong> {attribution}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
