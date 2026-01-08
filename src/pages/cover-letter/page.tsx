import Layout from '../../components/feature/Layout';
import { Link } from 'react-router-dom';

export default function CoverLetterPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg width="100%" height="100%">
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          {/* Icon */}
          <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl">
                <i className="ri-file-text-line text-3xl md:text-5xl text-white"></i>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg shadow-lg">
                  <i className="ri-quill-pen-line text-xs md:text-sm text-white"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Cover Letter Generator
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 md:mb-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Create personalized, professional cover letters tailored to each opportunity
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: 'ri-magic-line', text: 'AI-Powered' },
              { icon: 'ri-user-heart-line', text: 'Personalized' },
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
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Card */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-soft-lg hover:shadow-soft-xl transition-all p-6 md:p-12 text-center mb-6 md:mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
            
            <div className="relative">
              {/* Icon */}
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <i className="ri-tools-line text-3xl md:text-4xl text-white"></i>
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs md:text-sm font-semibold rounded-full mb-4 md:mb-6 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Coming in Phase 2
              </div>

              {/* Message */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
                Cover Letter Generator
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We're building an intelligent cover letter generator that will help you create personalized, 
                professional cover letters tailored to each job opportunity. Stay tuned!
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 md:mb-6 text-center">
              What to Expect
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: 'ri-magic-line',
                  title: 'Smart Customization',
                  description: 'AI-powered suggestions based on job description and your CV',
                  gradient: 'from-teal-500 to-emerald-600'
                },
                {
                  icon: 'ri-edit-line',
                  title: 'Easy Editing',
                  description: 'Full control to review and modify generated content',
                  gradient: 'from-blue-500 to-indigo-600'
                },
                {
                  icon: 'ri-file-copy-line',
                  title: 'Multiple Versions',
                  description: 'Save and manage different versions for various applications',
                  gradient: 'from-purple-500 to-pink-600'
                },
                {
                  icon: 'ri-download-line',
                  title: 'Export Ready',
                  description: 'Download in multiple formats (PDF, DOCX)',
                  gradient: 'from-emerald-500 to-teal-600'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-4 md:p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-soft hover:shadow-soft-lg transition-all"
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br ${feature.gradient} rounded-xl mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <i className={`${feature.icon} text-xl md:text-2xl text-white`}></i>
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105 cursor-pointer whitespace-nowrap text-sm md:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
              <i className="ri-arrow-left-line relative z-10"></i>
              <span className="relative z-10">Back to Dashboard</span>
            </Link>
            <Link
              to="/company-research"
              className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer whitespace-nowrap text-sm md:text-base"
            >
              <span>Research Companies</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          {/* Info Section */}
          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <i className="ri-information-line text-base md:text-lg text-white"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-sm md:text-base font-semibold text-slate-900 mb-1">
                  In the Meantime
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                  While we're building this feature, you can upload your CV and research companies 
                  to prepare for your applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
