import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/feature/Layout';
import CVWidget from '../dashboard/components/CVWidget';
import AnalyticsSummary from '../dashboard/components/AnalyticsSummary';
import ActivityFeed from '../dashboard/components/ActivityFeed';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';

export default function HomePage() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || 'Professional';

  return (
    <Layout>
      <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-white">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{firstName}</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your job search today.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/company-research"
                className="px-4 py-2 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors shadow-sm"
              >
                <i className="ri-search-line mr-2"></i>
                Research
              </Link>
              <Link
                to="/application/new"
                className="px-4 py-2 btn-primary font-bold flex items-center shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]"
              >
                <i className="ri-add-line mr-2"></i>
                New Application
              </Link>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Left Column (Main) */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">

              {/* Analytics Section */}
              <section>
                <h2 className="text-lg font-bold font-serif text-white mb-4">Overview</h2>
                <AnalyticsSummary />
              </section>

              {/* Tools Grid */}
              <section>
                <h2 className="text-lg font-bold font-serif text-white mb-4">Quick Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Company Research', desc: 'Analyze company culture & values', icon: 'ri-briefcase-line', link: '/company-research', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
                    { title: 'Cover Letter', desc: 'Generate tailored cover letters', icon: 'ri-quill-pen-line', link: '/cover-letter', color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
                    { title: 'Email Control', desc: 'Draft professional emails', icon: 'ri-mail-check-line', link: '/email-control', color: 'text-teal-400', bg: 'bg-teal-400/10' },
                    { title: 'Wishlist', desc: 'Manage your dream jobs', icon: 'ri-heart-line', link: '/profile', color: 'text-pink-400', bg: 'bg-pink-500/10' }
                  ].map((tool, idx) => (
                    <Link key={idx} to={tool.link}>
                      <Card hoverEffect className="h-full flex items-start gap-4 p-4 pointer-events-auto">
                        <div className={`p-3 rounded-lg ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
                          <i className={`${tool.icon} text-xl`}></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{tool.desc}</p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recent Applications (Placeholder) */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold font-serif text-white">Recent Applications</h2>
                  <Link to="/applications" className="text-sm text-accent-cyan hover:text-white font-medium">View All</Link>
                </div>
                <Card className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-folder-add-line text-2xl text-gray-500"></i>
                  </div>
                  <h3 className="text-white font-medium mb-1">No applications yet</h3>
                  <p className="text-gray-400 text-sm mb-4">Start tracking your job applications here</p>
                  <button className="text-sm text-teal-400 font-medium border border-teal-400/30 px-4 py-2 rounded-full hover:bg-teal-400/10">
                    Track Application
                  </button>
                </Card>
              </section>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6 md:space-y-8">

              {/* CV Widget */}
              <section className="h-[280px]">
                <CVWidget />
              </section>

              {/* Activity Feed */}
              <section>
                <ActivityFeed />
              </section>

              {/* Daily Tip */}
              <section className="bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <i className="ri-lightbulb-flash-line text-8xl transform rotate-12 text-teal-400"></i>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-teal-400 text-sm font-medium uppercase tracking-wider">
                    <i className="ri-sparkling-fill"></i>
                    Daily Tip
                  </div>
                  <p className="text-lg font-medium leading-relaxed mb-4 text-white">
                    "Tailoring your CV for every application increases your chances by 40%."
                  </p>
                  <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
                    Read more
                  </button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
