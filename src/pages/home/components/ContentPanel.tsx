import { motion, AnimatePresence } from 'framer-motion';
import { FEATURES } from './wheelUtils';
import { useNavigate } from 'react-router-dom';

interface ContentPanelProps {
    activeIndex: number;
    isLoggedIn?: boolean;
}

export default function ContentPanel({ activeIndex, isLoggedIn = true }: ContentPanelProps) {
    const navigate = useNavigate();
    const activeFeature = FEATURES[activeIndex] || FEATURES[0];

    const handleExploreClick = () => {
        if (isLoggedIn) {
            navigate(activeFeature.path || '#');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="relative w-full max-w-xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-6"
                >
                    {/* Title */}
                    <h2 className="text-5xl font-bold text-white tracking-tight font-serif leading-tight drop-shadow-md">
                        {activeFeature.label}
                    </h2>

                    {/* Divider */}
                    <div className={`w-20 h-1 bg-gradient-to-r ${activeFeature.color} rounded-full`} />

                    {/* Description */}
                    <p className="text-xl text-white/80 leading-relaxed font-sans font-light">
                        {activeFeature.description}
                    </p>

                    {/* Navigation Action */}
                    <div
                        onClick={handleExploreClick}
                        className="pt-6 flex items-center gap-4 cursor-pointer group w-fit"
                    >
                        <span className="text-lg font-semibold text-white border-b-2 border-transparent group-hover:border-teal-400 transition-colors duration-300">
                            {isLoggedIn ? 'Explore Feature' : 'Get Started'}
                        </span>

                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 hover:bg-teal-500 group-hover:bg-teal-500 group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[-45deg]"
                            >
                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </div>
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
