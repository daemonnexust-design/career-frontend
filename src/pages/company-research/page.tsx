import { useState } from 'react';
import Layout from '../../components/feature/Layout';
import { useCompanyResearch } from '../../hooks/useCompanyResearch';
import { HeroCard } from './components/HeroCard';
import { RiskBanner } from './components/RiskBanner';
import { SWOTGrid } from './components/SWOTGrid';
import { WarRoom } from './components/WarRoom';

export default function CompanyResearchPage() {
  const [url, setUrl] = useState('');
  const { loading, error, insight, analyzeCompany } = useCompanyResearch();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    await analyzeCompany(url);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f8fafc] pb-20">
        {/* Header & Search */}
        <div className="bg-slate-900 text-white pt-24 pb-32 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)' }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300 text-sm font-medium mb-6">
              <i className="ri-spy-line" />
              <span>Corporate Intelligence Center</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
              Outsmart your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">competition.</span>
            </h1>

            <form onSubmit={handleAnalyze} className="max-w-xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl opacity-30 group-hover:opacity-100 blur transition duration-500" />
              <div className="relative flex items-center bg-white rounded-xl p-2 shadow-2xl">
                <i className="ri-link text-slate-400 ml-4 text-xl" />
                <input
                  type="url"
                  className="flex-1 px-4 py-3 bg-transparent text-slate-800 placeholder:text-slate-400 font-medium outline-none"
                  placeholder="Paste Company URL (e.g. stripe.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {loading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-search-2-line" />}
                  Analyze
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 space-y-8">
          {/* Error State */}
          {error && (
            <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-red-500 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <i className="ri-error-warning-line text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Analysis Failed</h3>
                <p className="text-slate-600 mt-1 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {insight && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* 1. Risk Banner */}
              <RiskBanner threats={insight.swot_analysis.threats} />

              {/* 2. Hero Card */}
              <HeroCard
                url={insight.target_url}
                strategicFocus={insight.strategic_focus}
                cultureValues={insight.culture_decoder.values}
              />

              {/* 3. SWOT Grid */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="ri-layout-grid-line text-indigo-500" />
                  Strategic Analysis (SWOT)
                </h2>
                <SWOTGrid swot={insight.swot_analysis} />
              </div>

              {/* 4. War Room */}
              <WarRoom data={insight.interview_war_room} />
            </div>
          )}

          {/* Empty State / Loading Skeleton hint could go here if needed */}
        </div>
      </div>
    </Layout>
  );
}
