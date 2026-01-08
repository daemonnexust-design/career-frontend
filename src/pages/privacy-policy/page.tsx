import Layout from '../../components/feature/Layout';

export default function PrivacyPolicyPage() {
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
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-2xl">
                <i className="ri-shield-check-line text-3xl md:text-4xl text-white"></i>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Privacy Policy
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
                This Privacy Policy explains how <strong>Career Assistant</strong> ("we", "our", "us") collects, uses, stores, and protects personal data in accordance with the <strong>Nigeria Data Protection Regulation (NDPR)</strong>.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4 mb-0">
                By accessing or using our website and services (the "Service"), you consent to the data practices described in this Policy.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">1</span>
                Scope of This Policy
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                This Policy applies to:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Visitors to our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Registered and unregistered users of the Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                  <span>Any personal data processed in connection with our AI-powered career tools</span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">2</span>
                Personal Data We Collect
              </h2>
              
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 mt-6">2.1 Data You Provide Voluntarily</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We may collect personal data you choose to submit, including:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-user-line text-teal-600 mt-1"></i>
                  <span>Full name or display name</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-mail-line text-teal-600 mt-1"></i>
                  <span>Email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-file-text-line text-teal-600 mt-1"></i>
                  <span>Resume/CV content</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-briefcase-line text-teal-600 mt-1"></i>
                  <span>Job history, skills, and career preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-article-line text-teal-600 mt-1"></i>
                  <span>Cover letter inputs and generated drafts</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-building-line text-teal-600 mt-1"></i>
                  <span>Company names or roles searched</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                You control what information you submit.
              </p>

              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 mt-6">2.2 Automatically Collected Data</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                When you use the Service, we may collect limited technical information such as:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-global-line text-slate-500 mt-1"></i>
                  <span>IP address</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-smartphone-line text-slate-500 mt-1"></i>
                  <span>Device type and browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-computer-line text-slate-500 mt-1"></i>
                  <span>Operating system</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-eye-line text-slate-500 mt-1"></i>
                  <span>Pages viewed and interactions</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                This data is used strictly for security, analytics, and service improvement.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white text-sm">3</span>
                Lawful Basis for Processing (NDPR)
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We process personal data under the following lawful bases:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600 mt-1"></i>
                  <span><strong>User consent</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600 mt-1"></i>
                  <span><strong>Performance of a service</strong> requested by the user</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600 mt-1"></i>
                  <span><strong>Legitimate interest</strong>, including platform security and improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600 mt-1"></i>
                  <span><strong>Legal obligations</strong>, where applicable</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">4</span>
                How We Use Personal Data
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We use personal data to:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-service-line text-teal-600 mt-1"></i>
                  <span>Provide and operate the Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-robot-line text-teal-600 mt-1"></i>
                  <span>Generate AI-assisted career content (e.g., cover letters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-line-chart-line text-teal-600 mt-1"></i>
                  <span>Improve platform usability and performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-shield-check-line text-teal-600 mt-1"></i>
                  <span>Maintain security and prevent misuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-notification-line text-teal-600 mt-1"></i>
                  <span>Communicate important service updates</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4 font-semibold">
                We do <strong>not</strong> sell personal data.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg text-white text-sm">5</span>
                AI & Automated Processing Disclosure
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                The Service uses automated systems, including artificial intelligence, to assist users with career-related content.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Important clarifications:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-alert-fill text-orange-600 mt-1"></i>
                  <span>AI outputs are <strong>generated</strong>, not factual guarantees</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-alert-fill text-orange-600 mt-1"></i>
                  <span>Outputs may be inaccurate or incomplete</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-alert-fill text-orange-600 mt-1"></i>
                  <span>Users must review, edit, and validate all generated content</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-alert-fill text-orange-600 mt-1"></i>
                  <span>AI systems do <strong>not</strong> make autonomous decisions about users</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">6</span>
                Mock & Sample Data Disclaimer
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Some features may display <strong>sample or mock company data</strong> for demonstration purposes.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-information-fill text-blue-500 mt-1"></i>
                  <span>Mock data is clearly labeled</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-information-fill text-blue-500 mt-1"></i>
                  <span>It does not represent verified or real-time information</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-information-fill text-blue-500 mt-1"></i>
                  <span>Users should not rely on mock data for factual decisions</span>
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">7</span>
                Data Storage & Retention
              </h2>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-database-line text-teal-600 mt-1"></i>
                  <span>Personal data is retained only as long as necessary for service delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-delete-bin-line text-teal-600 mt-1"></i>
                  <span>Inactive or obsolete data may be deleted periodically</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-user-unfollow-line text-teal-600 mt-1"></i>
                  <span>Users may request deletion of their personal data</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                Retention policies may evolve as the Service develops.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">8</span>
                Data Sharing & Third Parties
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We do not share personal data except:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-server-line text-slate-600 mt-1"></i>
                  <span>With trusted service providers (hosting, analytics, infrastructure)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-government-line text-slate-600 mt-1"></i>
                  <span>When required by Nigerian law or lawful authority</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-shield-line text-slate-600 mt-1"></i>
                  <span>To protect our legal rights or platform integrity</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                All third-party processors are required to handle data securely.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white text-sm">9</span>
                Data Security
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We implement reasonable technical and organizational measures to protect personal data, including:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-lock-line text-emerald-600 mt-1"></i>
                  <span>Secure hosting environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-key-line text-emerald-600 mt-1"></i>
                  <span>Restricted access controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-eye-line text-emerald-600 mt-1"></i>
                  <span>Monitoring and security best practices</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                Despite these measures, no system can be guaranteed 100% secure.
              </p>
            </div>

            {/* Section 10 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg text-white text-sm">10</span>
                Your Rights Under NDPR
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Under the NDPR, you have the right to:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-file-search-line text-indigo-600 mt-1"></i>
                  <span>Access your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-edit-line text-indigo-600 mt-1"></i>
                  <span>Request correction of inaccurate data</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-delete-bin-line text-indigo-600 mt-1"></i>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-line text-indigo-600 mt-1"></i>
                  <span>Withdraw consent at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-forbid-line text-indigo-600 mt-1"></i>
                  <span>Object to certain processing activities</span>
                </li>
              </ul>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mt-4">
                Requests can be made using the contact details below.
              </p>
            </div>

            {/* Section 11 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">11</span>
                Cross-Border Data Transfers
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Where personal data is transferred outside Nigeria:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 ml-6">
                <li className="flex items-start gap-2">
                  <i className="ri-shield-check-line text-teal-600 mt-1"></i>
                  <span>Appropriate safeguards are applied</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-shield-check-line text-teal-600 mt-1"></i>
                  <span>Transfers are limited to what is necessary for service delivery</span>
                </li>
              </ul>
            </div>

            {/* Section 12 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">12</span>
                Children's Data
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The Service is not intended for individuals under <strong>16 years of age</strong>. We do not knowingly collect personal data from children.
              </p>
            </div>

            {/* Section 13 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">13</span>
                Updates to This Policy
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Changes will be reflected by updating the effective date. Continued use of the Service constitutes acceptance of the revised Policy.
              </p>
            </div>

            {/* Section 14 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg text-white text-sm">14</span>
                Contact Information
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                For privacy-related questions or requests, contact:
              </p>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <i className="ri-mail-line text-teal-600"></i>
                <strong>Email:</strong>
                <a href="mailto:privacy@careerassistant.com" className="text-teal-600 hover:text-teal-700 transition-colors cursor-pointer">
                  privacy@careerassistant.com
                </a>
              </div>
            </div>

            {/* Final Notice */}
            <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium mb-0">
                <strong>By using the Service, you confirm that you have read and understood this Privacy Policy.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
