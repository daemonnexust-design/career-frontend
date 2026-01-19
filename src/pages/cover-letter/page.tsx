import { useEffect, useState } from 'react';
import Layout from '../../components/feature/Layout';
import { useCoverLetter } from '@/hooks/useCoverLetter';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import CVUploadSection from './components/CVUploadSection';
import GenerationSettings from './components/GenerationSettings';
import VersionSidebar from './components/VersionSidebar';
import CoverLetterEditor from './components/CoverLetterEditor';
import ExportBar from './components/ExportBar';

export default function CoverLetterPage() {
  const { user } = useAuth();
  const {
    loading,
    error,
    coverLetters,
    currentLetter,
    setCurrentLetter,
    generateCoverLetter,
    fetchCoverLetters,
    updateCoverLetter,
    deleteCoverLetter,
    toggleFavorite,
    exportCoverLetter,
    printAsPdf,
    clearError
  } = useCoverLetter();

  const [cvText, setCvText] = useState('');
  const [cvFilename, setCvFilename] = useState<string | undefined>();
  const [cvLoading, setCvLoading] = useState(true);
  const [showGenerator, setShowGenerator] = useState(true);

  // Fetch user's CV on mount
  useEffect(() => {
    const fetchCV = async () => {
      if (!user) {
        setCvLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('user_cvs')
          .select('cv_text, original_filename')
          .eq('user_id', user.id)
          .maybeSingle();

        if (data?.cv_text) {
          setCvText(data.cv_text);
          setCvFilename(data.original_filename || undefined);
        }
      } catch (err) {
        console.error('Error fetching CV:', err);
      } finally {
        setCvLoading(false);
      }
    };

    fetchCV();
    fetchCoverLetters();
  }, [user]);

  const handleGenerate = async (settings: {
    job_description: string;
    company_name: string;
    position: string;
    company_values?: string;
    tone: 'professional' | 'enthusiastic' | 'creative';
  }) => {
    const result = await generateCoverLetter({
      ...settings,
      cv_text: cvText || undefined
    });

    if (result) {
      setShowGenerator(false);
    }
  };

  const handleCVUploaded = (text: string, filename: string) => {
    setCvText(text);
    setCvFilename(filename);
  };

  const handleSelectVersion = (id: string) => {
    const letter = coverLetters.find(cl => cl.id === id);
    if (letter) {
      setCurrentLetter(letter);
      setShowGenerator(false);
    }
  };

  const handleSave = async () => {
    if (!currentLetter) return;
    await updateCoverLetter(currentLetter.id, {
      content: currentLetter.content,
      title: currentLetter.title
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this cover letter version?')) {
      await deleteCoverLetter(id);
      if (currentLetter?.id === id) {
        setShowGenerator(true);
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 px-4 sm:px-6 lg:px-8 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          <div className="flex justify-center mb-4 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl">
                <i className="ri-quill-pen-line text-3xl md:text-4xl text-white"></i>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight animate-fade-in-up">
            Cover Letter Generator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Create personalized, AI-powered cover letters tailored to each opportunity
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {[
              { icon: 'ri-magic-line', text: 'Smart Customization' },
              { icon: 'ri-file-copy-line', text: 'Multiple Versions' },
              { icon: 'ri-download-line', text: 'Export Ready' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-xs text-white">
                <i className={`${item.icon} text-sm`}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="ri-error-warning-line text-red-500 text-xl"></i>
                <span className="text-red-800">{error}</span>
              </div>
              <button onClick={clearError} className="text-red-400 hover:text-red-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Versions */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-6 space-y-4">
                <VersionSidebar
                  coverLetters={coverLetters}
                  currentId={currentLetter?.id || null}
                  onSelect={handleSelectVersion}
                  onDelete={handleDelete}
                  onToggleFavorite={toggleFavorite}
                  loading={loading && !currentLetter}
                />

                <button
                  onClick={() => { setCurrentLetter(null); setShowGenerator(true); }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <i className="ri-add-line"></i>
                  New Cover Letter
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 order-1 lg:order-2 space-y-6">
              {showGenerator && !currentLetter ? (
                <>
                  {/* CV Upload Section */}
                  {user && (
                    <CVUploadSection
                      cvText={cvText}
                      cvFilename={cvFilename}
                      onCVUploaded={handleCVUploaded}
                      userId={user.id}
                      loading={cvLoading}
                    />
                  )}

                  <GenerationSettings
                    onGenerate={handleGenerate}
                    loading={loading}
                    cvText={cvText}
                  />
                </>
              ) : currentLetter ? (
                <>
                  <CoverLetterEditor
                    content={currentLetter.content}
                    onChange={(content) => setCurrentLetter({ ...currentLetter, content })}
                    onSave={handleSave}
                    saving={loading}
                    title={currentLetter.title}
                    onTitleChange={(title) => setCurrentLetter({ ...currentLetter, title })}
                  />

                  <ExportBar
                    onExportHtml={() => exportCoverLetter(currentLetter.id, 'html')}
                    onExportTxt={() => exportCoverLetter(currentLetter.id, 'txt')}
                    onExportDocx={() => exportCoverLetter(currentLetter.id, 'docx')}
                    onPrint={printAsPdf}
                    loading={loading}
                    disabled={!currentLetter}
                  />

                </>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-quill-pen-line text-4xl text-purple-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Create Your First Cover Letter
                  </h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    Generate personalized cover letters tailored to each job opportunity with AI assistance.
                  </p>
                  <button
                    onClick={() => setShowGenerator(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    <i className="ri-magic-line mr-2"></i>
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Print Styles */}
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          .print-content { 
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </Layout>
  );
}
