import Layout from '../../components/feature/Layout';

export default function TermsOfServicePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          {/* Icon */}
          <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl">
                <i className="ri-file-text-line text-3xl md:text-4xl text-white"></i>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Last Updated: January 15, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-slate max-w-none">
            {/* Introduction */}
            <div className="mb-8 p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border border-teal-100">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-0">
                Welcome to <strong>Career Assistant</strong> ("we", "our", "us"). These Terms of Service ("Terms") govern your access to and use of our website, application, and services (collectively, the "Service").
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4 mb-0">
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">1</span>
                Description of the Service
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Career Assistant is a career assistance platform designed to help users:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Research companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Prepare job application materials (including CVs and cover letters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Receive informational guidance related to job applications and interviews</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                The Service may use automated systems, including artificial intelligence, to generate content based on user inputs.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">2</span>
                No Professional Advice
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                The Service provides <strong>informational and educational assistance only</strong>.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-orange-500 mt-1"></i>
                  <span>We do <strong>not</strong> provide legal, employment, financial, or professional career advice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-orange-500 mt-1"></i>
                  <span>All outputs are generated based on patterns and available information and <strong>should not be treated as guarantees</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-information-fill text-blue-500 mt-1"></i>
                  <span>You are solely responsible for reviewing, editing, and verifying any content before using it in real-world applications.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg text-white text-sm">3</span>
                AI-Generated Content Disclaimer
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                You acknowledge and agree that:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-alert-fill text-orange-600 mt-1"></i>
                  <span>AI-generated content may be inaccurate, incomplete, outdated, or biased.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-alert-fill text-orange-600 mt-1"></i>
                  <span>Outputs are <strong>not factual assertions</strong> and should be independently verified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-alert-fill text-orange-600 mt-1"></i>
                  <span>The Service does not guarantee interview success, job offers, or employment outcomes.</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4 mb-0">
                Use of AI-generated content is <strong>at your own discretion and risk</strong>.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">4</span>
                User Responsibilities
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Provide accurate and lawful information</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Use the Service only for lawful purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Not misuse, reverse engineer, or abuse the Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Not submit content that is unlawful, misleading, discriminatory, or infringing on third-party rights</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                You remain fully responsible for any content you submit or use.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">5</span>
                Account Access
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                If the Service requires an account:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-shield-check-fill text-teal-600 mt-1"></i>
                  <span>You are responsible for maintaining the confidentiality of your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-shield-check-fill text-teal-600 mt-1"></i>
                  <span>You are responsible for all activity under your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-shield-check-fill text-teal-600 mt-1"></i>
                  <span>We reserve the right to suspend or terminate accounts that violate these Terms</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">6</span>
                Intellectual Property
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                All platform content, design, branding, and software are owned by or licensed to us and are protected by applicable intellectual property laws.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                You retain ownership of content you submit, but you grant us a limited license to process it solely for the purpose of providing the Service.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">7</span>
                Acceptable Use
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-red-500 mt-1"></i>
                  <span>Use the Service to impersonate others</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-red-500 mt-1"></i>
                  <span>Submit false or misleading information</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-red-500 mt-1"></i>
                  <span>Attempt to bypass system limitations or safeguards</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-red-500 mt-1"></i>
                  <span>Use the Service for mass automation, scraping, or spam</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                We reserve the right to restrict access if misuse is detected.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">8</span>
                Third-Party Services
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                The Service may integrate with or link to third-party services (such as email providers or document tools).
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We are <strong>not responsible</strong> for third-party services, their content, or their policies. Use of third-party services is governed by their respective terms.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">9</span>
                Service Availability
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We aim to provide a reliable service but do not guarantee uninterrupted or error-free operation.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We may:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-tools-fill text-slate-500 mt-1"></i>
                  <span>Modify or discontinue features</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-tools-fill text-slate-500 mt-1"></i>
                  <span>Perform maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-tools-fill text-slate-500 mt-1"></i>
                  <span>Update the Service without prior notice</span>
                </li>
              </ul>
            </div>

            {/* Section 10 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg text-white text-sm">10</span>
                Limitation of Liability
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-information-fill text-slate-600 mt-1"></i>
                  <span>We are not liable for indirect, incidental, or consequential damages</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-information-fill text-slate-600 mt-1"></i>
                  <span>We are not responsible for employment decisions made by third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-information-fill text-slate-600 mt-1"></i>
                  <span>Total liability shall not exceed the amount paid by you (if any) in the preceding 12 months</span>
                </li>
              </ul>
            </div>

            {/* Section 11 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">11</span>
                Indemnification
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                You agree to indemnify and hold us harmless from claims arising out of:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-shield-line text-teal-600 mt-1"></i>
                  <span>Your use of the Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-shield-line text-teal-600 mt-1"></i>
                  <span>Your violation of these Terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-shield-line text-teal-600 mt-1"></i>
                  <span>Your misuse of AI-generated content</span>
                </li>
              </ul>
            </div>

            {/* Section 12 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">12</span>
                Termination
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                You may stop using the Service at any time.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We may suspend or terminate access if you violate these Terms or misuse the Service.
              </p>
            </div>

            {/* Section 13 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">13</span>
                Changes to These Terms
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We may update these Terms from time to time. Continued use of the Service after changes take effect constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Section 14 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">14</span>
                Governing Law
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                These Terms are governed by the laws of the <strong>Federal Republic of Nigeria</strong>, without regard to conflict of law principles.
              </p>
            </div>

            {/* Section 15 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">15</span>
                Contact
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                If you have questions about these Terms, please contact us at:
              </p>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <i className="ri-mail-line text-teal-600"></i>
                <strong>Email:</strong>
                <a href="mailto:support@careerassistant.com" className="text-teal-600 hover:text-teal-700 transition-colors cursor-pointer">
                  support@careerassistant.com
                </a>
              </div>
            </div>

            {/* Final Notice */}
            <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium mb-0">
                <strong>By using the Service, you acknowledge that you have read, understood, and agreed to these Terms of Service.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
