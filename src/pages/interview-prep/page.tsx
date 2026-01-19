import { useNavigate } from 'react-router-dom';
import MinimalHeader from '../../components/layout/MinimalHeader';

export default function InterviewPrepPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <MinimalHeader />

            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-6 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
                        Master Your<br />
                        <span className="text-rose-600">Interview Strategy</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl font-light">
                        Practice with AI-driven roleplay simulations, get real-time feedback on your answers,
                        and build confidence before the big day.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <i className="ri-user-voice-fill"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Mock Interviews</h3>
                        <p className="text-gray-500 mb-6">
                            Simulate real interview conditions with our AI persona. Choose your tone, difficulty, and focus area.
                        </p>
                        <button disabled className="text-sm font-semibold text-gray-400 cursor-not-allowed">
                            Coming Soon
                        </button>
                    </div>

                    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <i className="ri-question-answer-line"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Question Bank</h3>
                        <p className="text-gray-500 mb-6">
                            Access a curated library of common and behavioral interview questions tailored to your target role.
                        </p>
                        <button disabled className="text-sm font-semibold text-gray-400 cursor-not-allowed">
                            Coming Soon
                        </button>
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-8 text-center lg:text-left">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        ← Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}
