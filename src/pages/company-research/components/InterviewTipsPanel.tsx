import type { InterviewTips } from '../types';

interface InterviewTipsPanelProps {
  tips: InterviewTips;
}

export default function InterviewTipsPanel({ tips }: InterviewTipsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Interview Format */}
      <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
        <div className="flex items-center gap-2 mb-3">
          <i className="ri-calendar-check-line text-xl text-emerald-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Interview Format</h4>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{tips.format}</p>
      </div>

      {/* Common Questions */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <i className="ri-question-line text-xl text-blue-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Common Questions to Prepare</h4>
        </div>
        <ul className="space-y-2">
          {tips.commonQuestions.map((question, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <i className="ri-arrow-right-s-line text-base text-blue-600 mt-0.5 flex-shrink-0"></i>
              <span>{question}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Questions to Ask */}
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <i className="ri-chat-3-line text-xl text-purple-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Questions You Should Ask</h4>
        </div>
        <ul className="space-y-2">
          {tips.questionsToAsk.map((question, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <i className="ri-arrow-right-s-line text-base text-purple-600 mt-0.5 flex-shrink-0"></i>
              <span>{question}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What They Value */}
      <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
        <div className="flex items-center gap-2 mb-4">
          <i className="ri-star-line text-xl text-amber-600"></i>
          <h4 className="text-base font-semibold text-slate-900">What They Value in Candidates</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {tips.whatTheyValue.map((value, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white border border-amber-200 text-amber-900 text-sm font-medium rounded-lg"
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <i className="ri-time-line text-xl text-slate-600"></i>
          <h4 className="text-base font-semibold text-slate-900">Expected Timeline</h4>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{tips.timeline}</p>
      </div>
    </div>
  );
}
