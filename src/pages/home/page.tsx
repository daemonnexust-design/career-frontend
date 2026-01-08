import { Link } from 'react-router-dom';
import Layout from '../../components/feature/Layout';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-3.5rem)] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg width="100%" height="100%">
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          {/* Logo Mark with Animation */}
          <div className="flex justify-center mb-6 md:mb-8 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-2xl">
                <i className="ri-briefcase-4-line text-3xl md:text-4xl text-white"></i>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight animate-fade-in-up px-4" style={{ animationDelay: '0.1s' }}>
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Career Assistant
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-light mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
            Streamline your job search with intelligent tools for CV management,
            company research, and professional communication
          </p>

          {/* Icon Cluster */}
          <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: 'ri-file-upload-line', label: 'Upload' },
              { icon: 'ri-search-line', label: 'Research' },
              { icon: 'ri-mail-send-line', label: 'Email' }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-teal-400/50 transition-all hover:scale-110 cursor-pointer"
              >
                <i className={`${item.icon} text-xl md:text-2xl text-teal-400 group-hover:text-teal-300 transition-colors`}></i>
                <span className="absolute -bottom-6 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-in-up px-4" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/upload-cv"
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105 overflow-hidden whitespace-nowrap cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2 text-sm md:text-base">
                Get Started
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </span>
            </Link>
            <Link
              to="/company-research"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all whitespace-nowrap cursor-pointer text-sm md:text-base"
            >
              Research Companies
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-slate-400 animate-fade-in-up px-4" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.5s' }}></div>
              <span>AI-Assisted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-lg shadow-teal-400/50" style={{ animationDelay: '1s' }}></div>
              <span>Human-in-Control</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Everything You Need for Your Job Search
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools designed to help you stand out and succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: 'ri-file-upload-line',
                title: 'CV Management',
                description: 'Upload and manage your CV securely. Support for PDF and DOCX formats.',
                link: '/upload-cv',
                gradient: 'from-teal-500 to-emerald-600'
              },
              {
                icon: 'ri-search-line',
                title: 'Company Research',
                description: 'Get detailed insights about companies, culture, and interview tips.',
                link: '/company-research',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                icon: 'ri-file-text-line',
                title: 'Cover Letters',
                description: 'Generate personalized cover letters tailored to each opportunity.',
                link: '/cover-letter',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                icon: 'ri-mail-send-line',
                title: 'Email Control',
                description: 'Draft, review, and schedule professional emails with full control.',
                link: '/email-control',
                gradient: 'from-emerald-500 to-teal-600'
              }
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-6 md:p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-soft hover:shadow-soft-lg transition-all hover:scale-105 cursor-pointer"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <i className={`${feature.icon} text-2xl md:text-3xl text-white`}></i>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-sm md:text-base font-medium text-teal-600 group-hover:text-teal-700">
                  Learn more
                  <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Simple, Effective Process
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Get started in minutes with our streamlined workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: '01',
                title: 'Upload Your CV',
                description: 'Start by uploading your current CV. We support PDF and DOCX formats.',
                icon: 'ri-upload-cloud-line'
              },
              {
                step: '02',
                title: 'Research Companies',
                description: 'Get detailed insights about potential employers and prepare for interviews.',
                icon: 'ri-search-eye-line'
              },
              {
                step: '03',
                title: 'Apply with Confidence',
                description: 'Use our tools to craft perfect applications and follow up professionally.',
                icon: 'ri-send-plane-line'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-teal-200 to-transparent -translate-x-4"></div>
                )}
                <div className="relative p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-soft">
                  <div className="text-5xl md:text-6xl font-bold text-teal-100 mb-4">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl mb-4 md:mb-6 shadow-lg">
                    <i className={`${step.icon} text-2xl md:text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-base md:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join professionals who are landing their dream jobs with our AI-powered tools
          </p>
          <Link
            to="/upload-cv"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105 whitespace-nowrap cursor-pointer text-sm md:text-base"
          >
            Get Started Now
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
