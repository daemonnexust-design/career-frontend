import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/home', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { path: '/upload-cv', label: 'Upload CV', icon: 'ri-file-upload-line' },
    { path: '/company-research', label: 'Research', icon: 'ri-search-line' },
    { path: '/cover-letter', label: 'Cover Letter', icon: 'ri-file-text-line' },
    { path: '/email-control', label: 'Email Control', icon: 'ri-mail-send-line' }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo - Left aligned for thumb reach */}
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg">
                <i className="ri-briefcase-4-line text-lg md:text-xl text-white"></i>
              </div>
              <h1 className="text-base md:text-xl font-semibold text-slate-900 tracking-tight">Career Assistant</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <i className={`${item.icon} text-base`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Auth Buttons */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
                {user ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-lg">
                    <i className="ri-user-line text-teal-600"></i>
                    <span className="text-sm font-medium text-teal-700 whitespace-nowrap">
                      {user.email}
                    </span>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all whitespace-nowrap"
                    >
                      <i className="ri-login-circle-line text-base"></i>
                      <span>Log In</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:scale-105 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-user-add-line text-base"></i>
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Hamburger Button - Right aligned for thumb reach */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-slate-700`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer - Slides from right for thumb reach */}
      <div
        className={`fixed top-14 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-teal-50 text-teal-700 border-r-4 border-teal-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <i className={`${item.icon} text-xl`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile Auth Links */}
            <div className="mt-4 pt-4 border-t border-slate-200 px-6 space-y-3">
              {user ? (
                <>
                  <div className="px-4 py-2 bg-teal-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <i className="ri-user-line text-teal-600"></i>
                      <span className="text-sm font-medium text-teal-700 whitespace-nowrap">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium whitespace-nowrap"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all whitespace-nowrap"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="ri-login-circle-line text-lg"></i>
                    <span>Log In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="ri-user-add-line text-lg"></i>
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Menu Footer */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <i className="ri-information-line"></i>
              <span>Career Assistant v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
