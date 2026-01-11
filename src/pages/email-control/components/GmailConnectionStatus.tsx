interface GmailConnectionStatusProps {
  isConnected: boolean;
  email: string | null;
  loading: boolean;
  onConnect: () => void;
}

export default function GmailConnectionStatus({
  isConnected,
  email,
  loading,
  onConnect
}: GmailConnectionStatusProps) {
  return (
    <div className={`relative group border rounded-xl shadow-lg overflow-hidden transition-all ${isConnected
        ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
        : 'bg-white border-gray-200'
      }`}>
      {/* Gradient Glow on Hover */}
      {!isConnected && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      )}

      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${isConnected
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
              }`}>
              <i className={`text-2xl text-white ${isConnected ? 'ri-checkbox-circle-line' : 'ri-google-fill'
                }`}></i>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {loading ? 'Checking connection...' : isConnected ? 'Gmail Connected' : 'Connect Gmail'}
              </h3>
              <p className="text-sm text-gray-600">
                {loading
                  ? 'Please wait...'
                  : isConnected
                    ? `Connected as ${email}`
                    : 'Connect your Gmail account to send emails'
                }
              </p>
            </div>
          </div>

          {/* Button */}
          {!isConnected && !loading && (
            <button
              onClick={onConnect}
              className="group/btn relative px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer overflow-hidden"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <span className="relative flex items-center">
                <i className="ri-google-fill mr-2"></i>
                Connect
                <i className="ri-arrow-right-line ml-2 group-hover/btn:translate-x-1 transition-transform"></i>
              </span>
            </button>
          )}

          {loading && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-gray-600">Loading...</span>
            </div>
          )}

          {isConnected && !loading && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300 rounded-lg">
              <i className="ri-check-line text-emerald-600"></i>
              <span className="text-sm font-medium text-emerald-700">Active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
