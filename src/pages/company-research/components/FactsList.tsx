import type { CompanyFact } from '../types';

interface FactsListProps {
  facts: CompanyFact[];
}

export default function FactsList({ facts }: FactsListProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
          <i className="ri-lightbulb-line text-base md:text-lg text-white"></i>
        </div>
        Quick Facts
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="group p-3 md:p-4 bg-slate-50 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-200 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="flex items-start gap-2 md:gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                <i className="ri-checkbox-circle-line text-xs md:text-sm text-white"></i>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                {fact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
