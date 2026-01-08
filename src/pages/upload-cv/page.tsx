
import { useState } from 'react';
import Layout from '../../components/feature/Layout';
import FileUploadZone from './components/FileUploadZone';
import FilePreview from './components/FilePreview';
import { validateFile } from './utils/fileValidation';
import { UploadedCV } from './types';

export default function UploadCVPage() {
  const [uploadedCV, setUploadedCV] = useState<UploadedCV | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileSelect = (file: File) => {
    // Immediate client-side validation
    const validation = validateFile(file);

    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file');
      setUploadedCV(null);
      return;
    }

    // Determine file type
    const fileName = file.name.toLowerCase();
    const fileType: 'pdf' | 'docx' = fileName.endsWith('.pdf') ? 'pdf' : 'docx';

    // Success state
    const cv: UploadedCV = {
      file,
      name: file.name,
      size: file.size,
      type: fileType,
      uploadedAt: new Date()
    };

    setUploadedCV(cv);
    setErrorMessage('');
  };

  const handleRemove = () => {
    setUploadedCV(null);
    setErrorMessage('');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center w-full">
          {/* Icon */}
          <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-2xl">
                <i className="ri-file-upload-line text-3xl md:text-5xl text-white"></i>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Upload Your CV
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Start your journey by uploading your resume
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: 'ri-shield-check-line', text: 'Secure' },
              { icon: 'ri-file-line', text: 'PDF/DOCX' },
              { icon: 'ri-flashlight-line', text: 'Instant' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-xs md:text-sm text-white">
                <i className={`${item.icon} text-sm md:text-base`}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          {!uploadedCV ? (
            <>
              {/* Upload Zone */}
              <div className="mb-6 md:mb-8">
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  disabled={false}
                ></FileUploadZone>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 md:mb-8 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <i className="ri-error-warning-line text-xl text-red-600 flex-shrink-0"></i>
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              )}

              {/* Tips Section */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3 md:mb-4 flex items-center gap-2">
                  <i className="ri-lightbulb-line text-lg md:text-xl text-teal-600"></i>
                  Tips for Best Results
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {[
                    'Use a clear, professional format',
                    'Include relevant keywords for your industry',
                    'Keep file size under 5MB',
                    'Ensure text is readable and not image-based'
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-slate-600">
                      <i className="ri-checkbox-circle-fill text-base md:text-lg text-teal-600 flex-shrink-0 mt-0.5"></i>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <FilePreview
              file={uploadedCV}
              onRemove={handleRemove}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
