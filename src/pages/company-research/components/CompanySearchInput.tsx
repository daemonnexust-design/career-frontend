
interface CompanySearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  presetCompanies: string[];
  onSelectPreset: (company: string) => void;
  isLoading?: boolean;
}

export default function CompanySearchInput({
  value,
  onChange,
  onSearch,
  isLoading
}: CompanySearchInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all p-4 md:p-6">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <i className="ri-search-line absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-lg md:text-xl text-slate-400"></i>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter company name..."
            disabled={isLoading}
            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          disabled={isLoading || !value.trim()}
          className="group relative px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer whitespace-nowrap text-sm md:text-base"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <span>Search</span>
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
