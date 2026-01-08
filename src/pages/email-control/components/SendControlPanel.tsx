interface SendControlPanelProps {
  onSendNow: () => void;
  onSchedule: () => void;
  onDiscard: () => void;
  disabled: boolean;
}

export default function SendControlPanel({ onSendNow, onSchedule, onDiscard, disabled }: SendControlPanelProps) {
  return (
    <div className="relative group bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden sticky top-6">
      {/* Gradient Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div className="relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <i className="ri-send-plane-line text-xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Send Options</h3>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3">
          {/* Send Now Button */}
          <button
            onClick={onSendNow}
            disabled={disabled}
            className="group/btn relative w-full px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg hover:from-teal-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-lg whitespace-nowrap cursor-pointer overflow-hidden"
          >
            {/* Shine Effect */}
            {!disabled && (
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            )}
            
            <span className="relative flex items-center justify-center">
              <i className="ri-send-plane-fill mr-2"></i>
              Send Now
              {!disabled && <i className="ri-arrow-right-line ml-2 group-hover/btn:translate-x-1 transition-transform"></i>}
            </span>
          </button>

          {/* Schedule Button */}
          <button
            onClick={onSchedule}
            disabled={disabled}
            className="group/btn w-full px-6 py-4 text-base font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-white transition-all shadow-sm hover:shadow whitespace-nowrap cursor-pointer"
          >
            <span className="flex items-center justify-center">
              <i className="ri-calendar-schedule-line mr-2"></i>
              Schedule Send
              {!disabled && <i className="ri-arrow-right-line ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all"></i>}
            </span>
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-gray-500 bg-white">or</span>
            </div>
          </div>

          {/* Discard Button */}
          <button
            onClick={onDiscard}
            className="group/btn w-full px-6 py-3 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all shadow-sm hover:shadow whitespace-nowrap cursor-pointer"
          >
            <span className="flex items-center justify-center">
              <i className="ri-delete-bin-line mr-2"></i>
              Discard Draft
            </span>
          </button>
        </div>

        {/* Info */}
        {disabled && (
          <div className="px-6 pb-6">
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <i className="ri-information-line text-lg text-white"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-900 mb-1">Gmail Required</p>
                <p className="text-xs text-amber-700">Connect your Gmail account to send emails</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
