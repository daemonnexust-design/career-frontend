import { useState } from 'react';

interface SchedulePickerProps {
  onSchedule: (date: Date) => void;
  onCancel: () => void;
}

export default function SchedulePicker({ onSchedule, onCancel }: SchedulePickerProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      const dateTime = new Date(`${selectedDate}T${selectedTime}`);
      onSchedule(dateTime);
    }
  };

  const isValid = selectedDate && selectedTime;
  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const minTime = selectedDate === minDate ? now.toTimeString().slice(0, 5) : '00:00';

  return (
    <div className="relative group bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Gradient Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div className="relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <i className="ri-calendar-schedule-line text-xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Schedule Email</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-600">
            Choose when you want this email to be sent
          </p>

          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i className="ri-calendar-line"></i>
              Date
            </label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={minDate}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            />
          </div>

          {/* Time Picker */}
          <div>
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i className="ri-time-line"></i>
              Time
            </label>
            <input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              min={selectedDate === minDate ? minTime : undefined}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            />
          </div>

          {/* Preview */}
          {isValid && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <i className="ri-information-line text-lg text-white"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Scheduled for:</p>
                  <p className="text-sm text-blue-700">
                    {new Date(`${selectedDate}T${selectedTime}`).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
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
            onClick={handleSchedule}
            disabled={!isValid}
            className="group/btn relative w-full md:w-auto px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-lg whitespace-nowrap cursor-pointer overflow-hidden"
          >
            {/* Shine Effect */}
            {isValid && (
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            )}
            
            <span className="relative flex items-center justify-center">
              <i className="ri-calendar-check-line mr-2"></i>
              Confirm Schedule
              {isValid && <i className="ri-arrow-right-line ml-2 group-hover/btn:translate-x-1 transition-transform"></i>}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
