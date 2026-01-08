import { GmailConnection } from '../types';

interface GmailConnectionStatusProps {
  connection: GmailConnection;
  onConnect: () => void;
}

export default function GmailConnectionStatus({ connection, onConnect }: GmailConnectionStatusProps) {
  return (
    <div className={`relative group border rounded-xl shadow-lg overflow-hidden transition-all ${
      connection.isConnected 
        ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Gradient Glow on Hover */}
      {!connection.isConnected && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      )}

      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
              connection.isConnected
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
            }`}>
              <i className={`text-2xl text-white ${
                connection.isConnected ? 'ri-checkbox-circle-line' : 'ri-google-fill'
              }`}></i>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {connection.isConnected ? 'Gmail Connected' : 'Connect Gmail'}
              </h3>
              <p className="text-sm text-gray-600">
                {connection.isConnected 
                  ? `Connected as ${connection.email}`
                  : 'Connect your Gmail account to send emails'
                }
              </p>
            </div>
          </div>

          {/* Button */}
          {!connection.isConnected && (
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

          {connection.isConnected && (
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
