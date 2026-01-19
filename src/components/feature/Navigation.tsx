import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserAvatarMenu } from './UserAvatarMenu';

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { path: '/company-research', label: 'Skills & Research', icon: 'ri-search-line' },
    { path: '/cover-letter', label: 'Cover Letters', icon: 'ri-file-text-line' },
  ];

  return (
    <>
      <nav className="bg-navy-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-gradient-to-br from-accent-yellow to-yellow-400 rounded-lg">
                <i className="ri-briefcase-4-line text-lg md:text-xl text-black"></i>
              </div>
              <h1 className="text-base md:text-xl font-bold font-serif text-white tracking-tight">Career Assistant</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${location.pathname === item.path
                    ? 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <i className={`${item.icon} text-base`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="ml-4 pl-4 border-l border-white/10">
                {user ? (
                  <UserAvatarMenu />
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-sm font-bold bg-accent-yellow text-black rounded-full hover:shadow-[0_0_15px_rgba(242,187,47,0.4)] transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              {user && <UserAvatarMenu />}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-white`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav >

      {/* Mobile Menu Drawer */}
      < div
        className={`fixed inset-y-0 right-0 w-64 bg-navy-900 border-l border-white/10 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`
        }
      >
        <div className="flex flex-col h-full pt-16">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-4 text-base font-medium ${location.pathname === item.path
                ? 'bg-accent-yellow/10 text-accent-yellow border-r-4 border-accent-yellow'
                : 'text-gray-400 hover:text-white'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span>{item.label}</span>
            </Link>
          ))}

          {!user && (
            <div className="mt-4 pt-4 border-t border-white/10 px-6 space-y-3">
              <Link to="/login" className="block text-center py-2 text-gray-400 font-medium">Log In</Link>
              <Link to="/signup" className="block text-center py-2 bg-accent-yellow text-black rounded-full font-bold">Sign Up</Link>
            </div>
          )}
        </div>
      </div >
    </>
  );
}
