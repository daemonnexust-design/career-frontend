import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserAvatarMenu } from '../feature/UserAvatarMenu';

export default function MinimalHeader() {
    const { user } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-navy-900/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6 lg:px-12">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <Link to="/home" className="flex items-center gap-2 md:gap-3 group">
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <i className="ri-briefcase-line text-lg text-white"></i>
                    </div>
                    <span className="text-lg md:text-xl font-bold font-serif text-white tracking-tight">Career Assistant</span>
                </Link>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center gap-3">
                {user ? (
                    <UserAvatarMenu />
                ) : (
                    <>
                        <Link to="/login" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
