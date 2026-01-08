interface GenerateEmailButtonProps {
  onGenerate: () => void;
  isLoading: boolean;
}

export default function GenerateEmailButton({ onGenerate, isLoading }: GenerateEmailButtonProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-soft-lg hover:shadow-soft-xl transition-all p-6 md:p-12 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl"></div>
      
      <div className="relative">
        {/* Icon */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <i className="ri-mail-add-line text-3xl md:text-4xl text-white"></i>
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
          Generate Professional Email
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Create a professional email draft for your job application. You'll have full control 
          to review and edit before sending.
        </p>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="group relative inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer whitespace-nowrap text-sm md:text-base"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
          {isLoading ? (
            <>
              <i className="ri-loader-4-line text-xl md:text-2xl animate-spin relative z-10"></i>
              <span className="relative z-10">Generating...</span>
            </>
          ) : (
            <>
              <i className="ri-magic-line text-xl md:text-2xl relative z-10"></i>
              <span className="relative z-10">Generate Email</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
