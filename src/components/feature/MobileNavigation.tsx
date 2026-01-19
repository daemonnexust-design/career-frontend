import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { path: '/profile', label: 'Profile', icon: 'ri-user-settings-line' },
    { path: '/upload-cv', label: 'Upload CV', icon: 'ri-file-upload-line' },
    { path: '/company-research', label: 'Research', icon: 'ri-search-line' },
    { path: '/cover-letter', label: 'Cover Letter', icon: 'ri-file-text-line' },
    { path: '/email-control', label: 'Emails', icon: 'ri-mail-line' }
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-navy-900/90 backdrop-blur-md border-b border-white/5 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-accent-yellow to-yellow-400 rounded-lg flex items-center justify-center">
              <i className="ri-briefcase-4-line text-lg text-black"></i>
            </div>
            <span className="text-lg font-bold font-serif text-white">Career</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Profile Icon */}
            <Link to="/profile" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white">
              <i className="ri-user-line text-xl"></i>
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                ></span>
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
                ></span>
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[280px] bg-navy-900 border-l border-white/10 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-accent-yellow to-yellow-400 rounded-lg flex items-center justify-center">
                <i className="ri-briefcase-4-line text-lg text-black"></i>
              </div>
              <span className="text-lg font-bold font-serif text-white">Menu</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <i className="ri-close-line text-2xl text-white"></i>
            </button>
          </div>

          {/* User Info */}
          {user && (
            <Link to="/profile" className="block px-4 py-4 bg-white/5 border-b border-white/10 active:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-yellow to-yellow-400 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-xl text-black"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    View Profile <i className="ri-arrow-right-s-line"></i>
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-4 text-base font-medium ${location.pathname === item.path
                    ? 'bg-accent-yellow/10 text-accent-yellow border-r-4 border-accent-yellow'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <i className={`${item.icon} text-xl`}></i>
                  <span>{item.label}</span>
                  {isActive && (
                    <i className="ri-arrow-right-s-line text-lg ml-auto"></i>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Menu Footer */}
          <div className="border-t border-white/10 p-4 space-y-2">
            <Link
              to="/privacy-policy"
              className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-shield-check-line text-lg"></i>
              <span className="text-sm">Privacy Policy</span>
            </Link>
            <Link
              to="/terms-of-service"
              className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-file-list-line text-lg"></i>
              <span className="text-sm">Terms of Service</span>
            </Link>
            {user && (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-logout-box-line text-lg"></i>
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
