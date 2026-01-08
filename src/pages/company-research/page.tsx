import { useState } from 'react';
import Layout from '../../components/feature/Layout';
import CompanySearchInput from './components/CompanySearchInput';
import CompanyProfileHeader from './components/CompanyProfileHeader';
import GlobalDisclaimer from './components/GlobalDisclaimer';
import InsightSection from './components/InsightSection';
import FactsList from './components/FactsList';
import CultureInsights from './components/CultureInsights';
import RedFlagsPanel from './components/RedFlagsPanel';
import InterviewTipsPanel from './components/InterviewTipsPanel';
import { getMockCompanyInsights } from './utils/mockCompanyData';
import type { CompanyInsights } from './types';

type PageState = 'idle' | 'loading' | 'results' | 'not-found';

export default function CompanyResearchPage() {
  const [state, setState] = useState<PageState>('idle');
  const [companyName, setCompanyName] = useState('');
  const [insights, setInsights] = useState<CompanyInsights | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    facts: true,
    culture: false,
    redFlags: false,
    interviewTips: false
  });
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const presetCompanies = ['Google', 'Stripe', 'Andela'];

  const handleSearch = () => {
    if (!companyName.trim()) return;

    setState('loading');
    
    setTimeout(() => {
      const result = getMockCompanyInsights(companyName);
      if (result) {
        setInsights(result);
        setState('results');
        setShowDisclaimer(true);
      } else {
        setState('not-found');
      }
    }, 500);
  };

  const handlePresetSelect = (company: string) => {
    setCompanyName(company);
    setTimeout(() => {
      const result = getMockCompanyInsights(company);
      if (result) {
        setInsights(result);
        setState('results');
        setShowDisclaimer(true);
      }
    }, 500);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg width="100%" height="100%">
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          {/* Icon */}
          <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl">
                <i className="ri-search-line text-3xl md:text-5xl text-white"></i>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg shadow-lg">
                  <i className="ri-building-line text-xs md:text-sm text-white"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Company Research
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 md:mb-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Get detailed insights about companies, their culture, and interview preparation tips
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: 'ri-information-line', text: 'Company Info' },
              { icon: 'ri-team-line', text: 'Culture Insights' },
              { icon: 'ri-chat-quote-line', text: 'Interview Tips' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-xs md:text-sm text-white">
                <i className={`${item.icon} text-sm md:text-base`}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <CompanySearchInput
            value={companyName}
            onChange={setCompanyName}
            onSearch={handleSearch}
            presetCompanies={presetCompanies}
            onSelectPreset={handlePresetSelect}
          />
        </div>
      </section>

      {/* Results Section */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {state === 'idle' && (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative w-32 h-32 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-xl">
                  <i className="ri-building-line text-6xl text-slate-400"></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Search for a company
              </h3>
              <p className="text-lg text-slate-600">
                Enter a company name or select from our examples to view insights
              </p>
            </div>
          )}

          {state === 'loading' && (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl"></div>
              </div>
              <p className="text-lg text-slate-600 font-medium">Loading company insights...</p>
            </div>
          )}

          {state === 'not-found' && (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-300 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative w-32 h-32 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-xl">
                  <i className="ri-error-warning-line text-6xl text-orange-500"></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Company not found
              </h3>
              <p className="text-lg text-slate-600 mb-8">
                We don't have sample data for "{companyName}" yet.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-xl">
                <i className="ri-information-line text-slate-500"></i>
                <p className="text-sm text-slate-600 font-medium">
                  Try one of our examples: {presetCompanies.join(', ')}
                </p>
              </div>
            </div>
          )}

          {state === 'results' && insights && (
            <div className="space-y-8 animate-fade-in">
              {showDisclaimer && (
                <GlobalDisclaimer onDismiss={() => setShowDisclaimer(false)} />
              )}

              <CompanyProfileHeader company={insights.profile} />

              <div className="space-y-6">
                <InsightSection
                  title="Company Facts"
                  type="facts"
                  icon="ri-file-list-3-line"
                  isExpanded={expandedSections.facts}
                  onToggle={() => toggleSection('facts')}
                  attribution={insights.attribution.facts}
                >
                  <FactsList facts={insights.facts} />
                </InsightSection>

                <InsightSection
                  title="Culture & Values"
                  type="guidance"
                  icon="ri-team-line"
                  isExpanded={expandedSections.culture}
                  onToggle={() => toggleSection('culture')}
                  attribution={insights.attribution.culture}
                >
                  <CultureInsights culture={insights.culture} />
                </InsightSection>

                <InsightSection
                  title="Potential Concerns"
                  type="guidance"
                  icon="ri-alert-line"
                  isExpanded={expandedSections.redFlags}
                  onToggle={() => toggleSection('redFlags')}
                  attribution={insights.attribution.redFlags}
                >
                  <RedFlagsPanel redFlags={insights.redFlags} />
                </InsightSection>

                <InsightSection
                  title="Interview Preparation"
                  type="guidance"
                  icon="ri-lightbulb-line"
                  isExpanded={expandedSections.interviewTips}
                  onToggle={() => toggleSection('interviewTips')}
                  attribution={insights.attribution.interviewTips}
                >
                  <InterviewTipsPanel tips={insights.interviewTips} />
                </InsightSection>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
