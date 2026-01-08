interface ValidationMessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

export default function ValidationMessage({ type, message }: ValidationMessageProps) {
  const styles = {
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const icons = {
    error: 'ri-error-warning-line',
    success: 'ri-checkbox-circle-line',
    info: 'ri-information-line'
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${styles[type]}`}
      role="alert"
      aria-live="polite"
    >
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        <i className={`${icons[type]} text-lg`}></i>
      </div>
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
}
