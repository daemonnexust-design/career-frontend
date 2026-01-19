import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 text-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div>
            <Link to="/home" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <i className="ri-briefcase-4-line text-lg md:text-xl text-white"></i>
              </div>
              <h3 className="text-base md:text-lg font-bold font-serif">Career Assistant</h3>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Your AI-powered companion for a successful job search journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/upload-cv', label: 'Upload CV' },
                { to: '/company-research', label: 'Research' },
                { to: '/email-control', label: 'Email Control' }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-sm"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Features</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line"></i>
                CV Management
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line"></i>
                Company Insights
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line"></i>
                Email Drafting
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line"></i>
                Interview Prep
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { to: '/terms-of-service', label: 'Terms of Service' },
                { to: '/privacy-policy', label: 'Privacy Policy' }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-sm"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 md:mt-6">
              <h4 className="text-sm md:text-base font-semibold mb-3">Connect</h4>
              <div className="flex gap-3">
                {[
                  { icon: 'ri-twitter-x-line', label: 'Twitter' },
                  { icon: 'ri-linkedin-line', label: 'LinkedIn' },
                  { icon: 'ri-github-line', label: 'GitHub' }
                ].map((social) => (
                  <button
                    key={social.label}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all hover:scale-110 cursor-pointer"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-base md:text-lg`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4 text-xs sm:text-sm text-gray-500">
          <p>© 2024 Career Assistant. All rights reserved.</p>
          <p className="text-gray-500">NDPR Aligned</p>
        </div>
      </div>
    </footer>
  );
}
