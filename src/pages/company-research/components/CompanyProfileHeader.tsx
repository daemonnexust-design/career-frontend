import type { CompanyProfile } from '../types';

interface CompanyProfileHeaderProps {
  company: CompanyProfile;
}

export default function CompanyProfileHeader({ company }: CompanyProfileHeaderProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-soft-lg p-4 md:p-8 hover:shadow-soft-xl transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-2xl"></div>
      
      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Company Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <i className="ri-building-line text-3xl md:text-4xl text-white"></i>
          </div>
        </div>

        {/* Company Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {company.name}
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            {company.description}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="relative grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {[
          { icon: 'ri-building-line', label: 'Industry', value: company.industry, gradient: 'from-blue-500 to-indigo-600' },
          { icon: 'ri-team-line', label: 'Size', value: company.size, gradient: 'from-teal-500 to-emerald-600' },
          { icon: 'ri-map-pin-line', label: 'Location', value: company.location, gradient: 'from-purple-500 to-pink-600' },
          { icon: 'ri-calendar-line', label: 'Founded', value: company.founded, gradient: 'from-emerald-500 to-teal-600' },
          { icon: 'ri-stock-line', label: 'Status', value: company.status, gradient: 'from-indigo-500 to-blue-600' }
        ].map((item, index) => (
          <div key={index} className="bg-slate-50 rounded-xl p-3 md:p-4 hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gradient-to-br ${item.gradient} rounded-lg`}>
                <i className={`${item.icon} text-xs md:text-sm text-white`}></i>
              </div>
              <span className="text-xs md:text-sm font-medium text-slate-600">{item.label}</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 truncate">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
