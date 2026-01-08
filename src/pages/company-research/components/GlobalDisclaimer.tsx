interface GlobalDisclaimerProps {
  onDismiss: () => void;
}

export default function GlobalDisclaimer({ onDismiss }: GlobalDisclaimerProps) {
  return (
    <div className="relative group animate-fade-in">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-md opacity-20"></div>
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-md">
              <i className="ri-information-line text-2xl text-white"></i>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
              Sample Data Notice
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed mb-4">
              This information is for demonstration purposes only. It combines publicly available data with 
              sample insights to show how company research might be presented. Always verify information 
              through official sources and your own research before making career decisions.
            </p>
            <button
              onClick={onDismiss}
              className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 text-amber-900 font-semibold rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>I understand</span>
              <i className="ri-check-line text-lg group-hover/btn:scale-110 transition-transform"></i>
            </button>
          </div>

          <button
            onClick={onDismiss}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-lg transition-all cursor-pointer"
            aria-label="Dismiss"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
