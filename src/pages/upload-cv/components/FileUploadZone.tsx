import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export default function FileUploadZone({ onFileSelect, disabled }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative border-2 border-dashed rounded-2xl p-6 sm:p-12 text-center cursor-pointer
        transition-all duration-300 min-h-[320px] flex flex-col items-center justify-center
        bg-white shadow-soft-lg
        ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''}
        ${isDragOver && !disabled 
          ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-teal-200 scale-[1.02]' 
          : 'border-slate-300 hover:border-teal-400 hover:shadow-xl hover:scale-[1.01]'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
        aria-label="Upload CV file"
      />

      {/* Icon Container */}
      <div className={`
        w-24 h-24 flex items-center justify-center mb-6 rounded-2xl
        transition-all duration-300
        ${isDragOver && !disabled
          ? 'bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/30 scale-110'
          : 'bg-gradient-to-br from-slate-100 to-slate-200'
        }
      `}>
        <i className={`
          ri-upload-cloud-2-line text-5xl transition-colors duration-300
          ${isDragOver && !disabled ? 'text-white' : 'text-teal-600'}
        `}></i>
      </div>

      {/* Text Content */}
      <h3 className="text-2xl font-semibold text-slate-900 mb-3">
        {isDragOver ? 'Drop your CV here' : 'Upload your CV'}
      </h3>

      <p className="text-base text-slate-600 mb-6 max-w-md">
        Drag and drop your file here, or click to browse
      </p>

      {/* Upload Button */}
      {!isDragOver && (
        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-folder-open-line text-lg"></i>
          <span>Choose File</span>
        </button>
      )}

      {/* Format Info */}
      <div className="mt-8 pt-6 border-t border-slate-200 w-full">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <i className="ri-file-pdf-line text-red-500"></i>
            <span>PDF</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <i className="ri-file-word-line text-blue-500"></i>
            <span>DOCX</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <i className="ri-database-2-line text-slate-400"></i>
            <span>Max 5MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
