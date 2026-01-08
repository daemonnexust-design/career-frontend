import { useState } from 'react';

interface EmailEditorProps {
  subject: string;
  body: string;
  recipient: string;
  onChange: (field: 'subject' | 'body' | 'recipient', value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EmailEditor({
  subject,
  body,
  recipient,
  onChange,
  onSave,
  onCancel
}: EmailEditorProps) {
  const [localSubject, setLocalSubject] = useState(subject);
  const [localBody, setLocalBody] = useState(body);
  const [localRecipient, setLocalRecipient] = useState(recipient);

  const handleSave = () => {
    onChange('subject', localSubject);
    onChange('body', localBody);
    onChange('recipient', localRecipient);
    onSave();
  };

  const isValid = localSubject.trim() && localBody.trim() && localRecipient.trim();

  return (
    <div className="relative group bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Gradient Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div className="relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <i className="ri-edit-line text-xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Edit Email</h3>
          </div>
        </div>

        {/* Editor Content */}
        <div className="p-6 space-y-5">
          {/* To Field */}
          <div>
            <label htmlFor="recipient" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i className="ri-user-line"></i>
              To
            </label>
            <input
              id="recipient"
              type="email"
              value={localRecipient}
              onChange={(e) => setLocalRecipient(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="recipient@company.com"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i className="ri-text"></i>
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={localSubject}
              onChange={(e) => setLocalSubject(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Email subject"
            />
            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <i className="ri-text-spacing"></i>
              {localSubject.length} characters
            </p>
          </div>

          {/* Body Field */}
          <div>
            <label htmlFor="body" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i className="ri-file-text-line"></i>
              Message
            </label>
            <textarea
              id="body"
              value={localBody}
              onChange={(e) => setLocalBody(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              placeholder="Email body"
            />
            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <i className="ri-text-spacing"></i>
              {localBody.length} characters
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-slate-50 border-t border-gray-200 flex flex-col-reverse md:flex-row gap-3 md:justify-end">
          <button
            onClick={onCancel}
            className="w-full md:w-auto px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow whitespace-nowrap cursor-pointer"
          >
            <i className="ri-close-line mr-2"></i>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="group/btn relative w-full md:w-auto px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-lg whitespace-nowrap cursor-pointer overflow-hidden"
          >
            {/* Shine Effect */}
            {isValid && (
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            )}
            
            <span className="relative flex items-center justify-center">
              <i className="ri-save-line mr-2"></i>
              Save Changes
              {isValid && <i className="ri-arrow-right-line ml-2 group-hover/btn:translate-x-1 transition-transform"></i>}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
