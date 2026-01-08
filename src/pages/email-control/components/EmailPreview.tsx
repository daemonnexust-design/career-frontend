import { EmailDraft } from '../types';

interface EmailPreviewProps {
  email: EmailDraft;
  onEdit: () => void;
}

export default function EmailPreview({ email, onEdit }: EmailPreviewProps) {
  return (
    <div className="relative group bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Gradient Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div className="relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <i className="ri-mail-line text-xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Email Preview</h3>
          </div>
          <button
            onClick={onEdit}
            className="group/btn px-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-lg transition-all border border-transparent hover:border-teal-200 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-edit-line mr-2"></i>
            Edit
            <i className="ri-arrow-right-line ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all"></i>
          </button>
        </div>

        {/* Email Content */}
        <div className="p-6 space-y-5">
          {/* To Field */}
          <div className="group/field">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              <i className="ri-user-line text-sm"></i>
              To
            </label>
            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg group-hover/field:border-teal-200 transition-colors">
              <p className="text-sm text-gray-900">{email.recipient}</p>
            </div>
          </div>

          {/* Subject Field */}
          <div className="group/field">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              <i className="ri-text text-sm"></i>
              Subject
            </label>
            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg group-hover/field:border-teal-200 transition-colors">
              <p className="text-sm font-medium text-gray-900">{email.subject}</p>
            </div>
          </div>

          {/* Body Field */}
          <div className="group/field">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              <i className="ri-file-text-line text-sm"></i>
              Message
            </label>
            <div className="px-5 py-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg group-hover/field:border-teal-200 transition-colors">
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {email.body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
