import FeatureWheel from './components/FeatureWheel';
import ContentPanel from './components/ContentPanel';
import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MinimalHeader from '../../components/layout/MinimalHeader';
import { useWheelScroll } from './hooks/useWheelScroll';
import { FEATURES } from './components/wheelUtils';
import { useAuth } from '../../hooks/useAuth';
import Footer from '../../components/feature/Footer';

// Hero Background URL
const HERO_BG_URL = 'https://readdy.ai/api/search-image?query=modern%20professional%20workspace%20with%20laptop%20and%20coffee%20minimalist%20clean%20aesthetic%20soft%20natural%20lighting%20warm%20tones%20abstract%20geometric%20shapes%20floating%20in%20background%20representing%20career%20growth%20and%20success%20digital%20illustration%20style&width=1920&height=1080&seq=landing-hero-bg-001&orientation=landscape';

const MobileFeatureList = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
    <>
        {FEATURES.map((feature) => (
            <Link
                key={feature.id}
                to={isLoggedIn ? feature.path || '#' : '/login'}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-4 hover:bg-white/20 transition-colors"
            >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-xl shadow-md`}>
                    <i className={feature.icon}></i>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white font-serif mb-2">{feature.label}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
            </Link>
        ))}
    </>
);

// Feature Cards Section (from landing page)
const features = [
    {
        icon: 'ri-file-text-line',
        title: 'Smart CV Analysis',
        description: 'Upload your CV and get AI-powered insights to optimize your resume for any job application.',
        image: 'https://readdy.ai/api/search-image?query=professional%20resume%20document%20being%20analyzed%20by%20AI%20with%20checkmarks%20and%20optimization%20suggestions%20floating%20around%20it%2C%20modern%20clean%20illustration%20style%20with%20teal%20and%20white%20colors%2C%20minimalist%20business%20aesthetic%20showing%20CV%20review%20process%20with%20data%20points%20and%20improvement%20indicators%2C%20digital%20art%20with%20simple%20geometric%20shapes%20and%20organized%20layout%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-cv-analysis-illustration-v2&orientation=landscape'
    },
    {
        icon: 'ri-building-line',
        title: 'Company Research',
        description: 'Deep dive into company culture, values, and interview processes to prepare like a pro.',
        image: 'https://readdy.ai/api/search-image?query=modern%20office%20building%20with%20magnifying%20glass%20and%20research%20data%20charts%20floating%20around%20it%2C%20company%20culture%20analysis%20illustration%20with%20information%20bubbles%20and%20insights%2C%20professional%20business%20style%20showing%20corporate%20research%20process%20with%20teal%20accents%2C%20clean%20geometric%20design%20with%20organized%20visual%20elements%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-company-research-illustration-v2&orientation=landscape'
    },
    {
        icon: 'ri-mail-line',
        title: 'Cover Letter Generator',
        description: 'Create personalized, compelling cover letters tailored to each job opportunity.',
        image: 'https://readdy.ai/api/search-image?query=elegant%20business%20letter%20with%20AI%20writing%20pen%20and%20personalization%20sparkles%20around%20it%2C%20professional%20cover%20letter%20creation%20illustration%20showing%20text%20editing%20and%20customization%2C%20modern%20style%20with%20teal%20highlights%20and%20clean%20typography%20design%2C%20digital%20illustration%20with%20organized%20composition%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-cover-letter-illustration-v2&orientation=landscape'
    },
    {
        icon: 'ri-send-plane-line',
        title: 'Email Control Center',
        description: 'Manage your job application emails with smart scheduling and follow-up tracking.',
        image: 'https://readdy.ai/api/search-image?query=email%20inbox%20dashboard%20with%20calendar%20scheduling%20icons%20and%20notification%20bells%20floating%20around%20it%2C%20professional%20email%20management%20illustration%20showing%20organized%20communication%20and%20automated%20follow-ups%2C%20modern%20digital%20style%20with%20teal%20accents%20and%20clean%20UI%20elements%20representing%20control%20center%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-email-control-illustration-v2&orientation=landscape'
    }
];

export default function WheelHome() {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { rotation, activeSliceIndex } = useWheelScroll(containerRef);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    const isLoggedIn = !!user;

    return (
        <div className="min-h-screen bg-navy-950 text-white selection:bg-accent-yellow/30 font-sans">
            {/* Header */}
            <MinimalHeader />

            {/* Hero Section with Wheel */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${HERO_BG_URL})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-navy-950" />

                {/* Hero Text - Above Wheel */}
                <div className="relative z-10 pt-24 pb-8 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-teal-400 text-xs sm:text-sm font-medium mb-6">
                        <i className="ri-sparkle-fill"></i>
                        <span className="tracking-wide uppercase text-[10px] sm:text-xs font-bold">AI-Powered Career Tools</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif mb-4 leading-tight">
                        Land Your Dream Job<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Faster & Smarter</span>
                    </h1>
                    <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto mb-6">
                        Your all-in-one career assistant powered by AI. From CV optimization to company research,
                        we help you stand out and succeed in your job search.
                    </p>
                    {!isLoggedIn && (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto btn-primary text-base sm:text-lg shadow-2xl hover:shadow-teal-500/40 whitespace-nowrap inline-flex items-center justify-center gap-2"
                            >
                                Start Free Today
                                <i className="ri-arrow-right-line"></i>
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto px-8 py-3 rounded-pill bg-white/5 backdrop-blur-sm text-white font-semibold text-base sm:text-lg hover:bg-white/10 transition-all border border-white/10 whitespace-nowrap inline-flex items-center justify-center gap-2"
                            >
                                <i className="ri-login-box-line"></i>
                                Log In
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Wheel Scroll Section - DESKTOP */}
            <div ref={containerRef} className="relative h-[300vh] hidden lg:block">
                <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                    {/* Left: Interactive Wheel Container */}
                    <div className="absolute left-0 top-0 bottom-0 w-[50vw] flex items-center justify-end pointer-events-none pr-0">
                        <div className="pointer-events-auto transform -translate-x-[50%] absolute left-0">
                            <FeatureWheel rotation={rotation} isLoggedIn={isLoggedIn} />
                        </div>
                    </div>

                    {/* Right: Contextual Content Panel */}
                    <div className="absolute right-0 top-0 bottom-0 w-[60vw] flex items-center pl-64 pr-12 lg:pr-24">
                        <ContentPanel activeIndex={activeSliceIndex} isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            </div>

            {/* MOBILE VIEW (Standard Vertical Scroll) */}
            <div className="lg:hidden min-h-screen pt-8 px-6 pb-12 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold font-serif text-white">
                        Career tools,<br />reimagined.
                    </h2>
                    <p className="text-white/70">
                        Everything you need to land your next role.
                    </p>
                </div>
                <div className="grid gap-6">
                    <MobileFeatureList isLoggedIn={isLoggedIn} />
                </div>
            </div>

            {/* Feature Cards Section */}
            <section className="py-12 sm:py-24 bg-navy-950 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-accent-purple/20 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="heading-section mb-3 sm:mb-4 px-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                            Comprehensive tools designed to streamline your job search and maximize your chances of success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative card-glass hover:-translate-y-2 cursor-pointer overflow-hidden border-white/5"
                            >
                                <div className="relative h-40 sm:h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-navy-900/20 z-10"></div>
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute top-4 left-4 w-12 h-12 sm:w-14 sm:h-14 bg-navy-900/80 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-20">
                                        <i className={`${feature.icon} text-xl sm:text-2xl text-teal-400`}></i>
                                    </div>
                                </div>
                                <div className="p-6 sm:p-8">
                                    <h3 className="text-lg sm:text-xl font-bold font-serif text-white mb-2 sm:mb-3">{feature.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-24 bg-gradient-to-br from-navy-900 to-navy-950 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-accent-purple/40 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px]"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <h2 className="heading-section mb-4 sm:mb-6">
                        Ready to Transform Your Career?
                    </h2>
                    <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
                        Join thousands of job seekers who are already using Career Assistant to land their dream jobs.
                        Start your journey today - it's free to get started!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        {isLoggedIn ? (
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto btn-primary text-base sm:text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl whitespace-nowrap inline-flex items-center justify-center gap-2"
                            >
                                Enter Dashboard
                                <i className="ri-dashboard-line"></i>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="w-full sm:w-auto btn-primary text-base sm:text-lg shadow-xl hover:shadow-teal-500/40 whitespace-nowrap inline-flex items-center justify-center gap-2"
                                >
                                    Create Free Account
                                    <i className="ri-arrow-right-line"></i>
                                </Link>
                                <Link
                                    to="/login"
                                    className="w-full sm:w-auto px-8 py-3 rounded-pill bg-white/5 backdrop-blur-sm text-white font-semibold text-base sm:text-lg hover:bg-white/10 transition-all border border-white/10 whitespace-nowrap inline-flex items-center justify-center gap-2"
                                >
                                    <i className="ri-login-box-line"></i>
                                    Already have an account?
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
