import type { CultureData } from '../types';

interface CultureInsightsProps {
  culture: CultureData;
}

export default function CultureInsights({ culture }: CultureInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Values */}
      <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
        <div className="flex items-center gap-2 mb-4">
          <i className="ri-star-line text-xl text-amber-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Core Values</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {culture.values.map((value, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white border border-amber-200 text-amber-900 text-sm font-medium rounded-lg"
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* Work Environment */}
      <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
        <div className="flex items-center gap-2 mb-3">
          <i className="ri-plant-line text-xl text-emerald-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Work Environment</h4>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{culture.workEnvironment}</p>
      </div>

      {/* Remote Policy */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <i className="ri-home-wifi-line text-xl text-blue-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Remote Policy</h4>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{culture.remotePolicy}</p>
      </div>

      {/* Benefits */}
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <i className="ri-gift-line text-xl text-purple-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Benefits Highlights</h4>
        </div>
        <ul className="space-y-2">
          {culture.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <i className="ri-checkbox-circle-fill text-base text-purple-600 mt-0.5 flex-shrink-0"></i>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
