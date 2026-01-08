import { CompanyInsights } from '../types';

const mockCompanies: Record<string, CompanyInsights> = {
  google: {
    profile: {
      name: 'Google',
      industry: 'Technology / Internet Services',
      size: '150,000+ employees',
      location: 'Mountain View, California',
      founded: 1998,
      status: 'Public'
    },
    facts: [
      { label: 'Parent Company', value: 'Alphabet Inc.', icon: 'ri-building-line' },
      { label: 'Market Cap', value: '$1.7+ trillion (2024)', icon: 'ri-line-chart-line' },
      { label: 'Primary Products', value: 'Search, Ads, Cloud, Android, YouTube', icon: 'ri-product-hunt-line' },
      { label: 'Global Presence', value: '70+ offices worldwide', icon: 'ri-global-line' },
      { label: 'R&D Investment', value: '$30+ billion annually', icon: 'ri-flask-line' },
      { label: 'Revenue (2023)', value: '$307 billion', icon: 'ri-money-dollar-circle-line' },
      { label: 'Stock Symbol', value: 'GOOGL (NASDAQ)', icon: 'ri-stock-line' },
      { label: 'CEO', value: 'Sundar Pichai', icon: 'ri-user-star-line' },
      { label: 'Engineering Focus', value: '50%+ of workforce in technical roles', icon: 'ri-code-s-slash-line' },
      { label: 'Innovation Labs', value: 'Google X, DeepMind, Verily', icon: 'ri-lightbulb-flash-line' }
    ],
    culture: {
      values: [
        'Focus on the user and all else will follow',
        'Innovation and technical excellence',
        'Data-driven decision making',
        'Collaboration across teams',
        'Transparency and open communication'
      ],
      workEnvironment: 'Fast-paced, intellectually stimulating environment with emphasis on autonomy and impact. Teams often work on products used by billions. Strong engineering culture with regular tech talks and learning opportunities.',
      remotePolicy: 'Hybrid model (3 days in office, 2 days flexible) as of 2024. Some roles may be fully remote depending on team needs.',
      benefits: [
        'Comprehensive health insurance',
        'Generous parental leave',
        'On-site wellness and fitness centers',
        'Free meals and snacks',
        '401(k) matching',
        'Education reimbursement',
        'Stock options (RSUs)',
        'Sabbatical programs for long-term employees'
      ]
    },
    redFlags: [
      {
        concern: 'High performance expectations and pressure',
        context: 'Google is known for rigorous performance reviews. This may be challenging for some, but often correlates with high-impact work and career growth.',
        severity: 'medium'
      },
      {
        concern: 'Bureaucracy in larger teams',
        context: 'Some teams report slower decision-making due to company size. Smaller teams or newer products may offer more agility.',
        severity: 'low'
      },
      {
        concern: 'Competitive internal environment',
        context: 'Promotion processes can be competitive. However, many employees report supportive team cultures that balance this.',
        severity: 'medium'
      },
      {
        concern: 'Recent layoffs (2023)',
        context: 'Google laid off ~12,000 employees in early 2023 as part of industry-wide adjustments. Stability has improved since then.',
        severity: 'medium'
      }
    ],
    interviewTips: {
      format: 'Typically 4-6 rounds: phone screen, technical interviews (coding, system design), and behavioral interviews. Process may take 4-8 weeks.',
      commonQuestions: [
        'Coding challenges (data structures, algorithms)',
        'System design questions (scalability, architecture)',
        'Behavioral questions using STAR method',
        'Questions about past projects and impact',
        'How you handle ambiguity and failure'
      ],
      questionsToAsk: [
        'What does success look like in this role in the first 6 months?',
        'How does this team collaborate with other parts of Google?',
        'What are the biggest technical challenges the team is facing?',
        'How does the team balance innovation with maintaining existing products?',
        'What opportunities are there for learning and growth?'
      ],
      whatTheyValue: [
        'Technical depth and problem-solving skills',
        'Ability to work on ambiguous problems',
        'Collaboration and communication',
        'User-focused thinking',
        'Googleyness (humility, conscientiousness, comfort with ambiguity)'
      ],
      timeline: 'Expect 4-8 weeks from initial contact to offer. Be prepared for multiple interview rounds and potential delays due to scheduling.'
    },
    attribution: {
      facts: 'Sample source: Company website, public financial reports',
      culture: 'Sample source: Employee reviews, public interviews',
      redFlags: 'Sample source: Employee review trends, industry reports',
      interviewTips: 'Sample source: Interview preparation guides, candidate experiences'
    }
  },
  stripe: {
    profile: {
      name: 'Stripe',
      industry: 'Financial Technology / Payments',
      size: '7,000+ employees',
      location: 'San Francisco, California (Remote-friendly)',
      founded: 2010,
      status: 'Private'
    },
    facts: [
      { label: 'Valuation', value: '$50 billion (2023)', icon: 'ri-line-chart-line' },
      { label: 'Primary Product', value: 'Payment processing infrastructure', icon: 'ri-bank-card-line' },
      { label: 'Customers', value: 'Millions of businesses worldwide', icon: 'ri-group-line' },
      { label: 'Transaction Volume', value: '$640+ billion annually', icon: 'ri-exchange-dollar-line' },
      { label: 'Global Reach', value: '45+ countries supported', icon: 'ri-global-line' },
      { label: 'Founders', value: 'Patrick and John Collison', icon: 'ri-user-star-line' },
      { label: 'Developer Focus', value: 'API-first platform with extensive documentation', icon: 'ri-code-s-slash-line' },
      { label: 'Product Suite', value: 'Payments, Billing, Connect, Radar, Terminal', icon: 'ri-apps-line' },
      { label: 'Engineering Culture', value: 'Strong emphasis on technical excellence', icon: 'ri-trophy-line' },
      { label: 'Growth Stage', value: 'Late-stage startup, pre-IPO', icon: 'ri-rocket-line' }
    ],
    culture: {
      values: [
        'Move with urgency and focus',
        'Think rigorously',
        'Trust and amplify',
        'Optimism and ambition',
        'Global mindset'
      ],
      workEnvironment: 'Fast-paced, high-autonomy environment with strong emphasis on ownership. Engineers often work on infrastructure used by millions of businesses. Culture values deep work and technical craftsmanship.',
      remotePolicy: 'Remote-friendly with offices in SF, Seattle, Dublin, Singapore, and more. Many roles are fully remote. Flexible work arrangements common.',
      benefits: [
        'Competitive salary and equity',
        'Comprehensive health insurance',
        'Generous parental leave',
        'Home office stipend for remote workers',
        '401(k) matching',
        'Learning and development budget',
        'Flexible PTO',
        'Annual company offsites'
      ]
    },
    redFlags: [
      {
        concern: 'Rapid growth and scaling challenges',
        context: 'Stripe has grown quickly, which may lead to occasional process gaps. However, this often means more opportunities for impact and career growth.',
        severity: 'low'
      },
      {
        concern: 'High expectations and fast pace',
        context: 'The company moves quickly and expects high output. This suits those who thrive in fast-paced environments but may be intense for others.',
        severity: 'medium'
      },
      {
        concern: 'Competitive compensation but private equity',
        context: 'Equity value depends on future IPO or acquisition. Cash compensation is strong, but equity liquidity is limited.',
        severity: 'low'
      },
      {
        concern: 'Some reports of work-life balance challenges',
        context: 'Fast-paced environment may lead to longer hours during critical projects. Varies significantly by team and role.',
        severity: 'medium'
      }
    ],
    interviewTips: {
      format: 'Typically 4-5 rounds: recruiter call, technical phone screen, onsite (or virtual) with coding, system design, and behavioral interviews. Process takes 3-6 weeks.',
      commonQuestions: [
        'Coding challenges focused on real-world problems',
        'System design for payment infrastructure',
        'API design and developer experience questions',
        'Behavioral questions about ownership and impact',
        'How you approach technical trade-offs'
      ],
      questionsToAsk: [
        'How does this role contribute to Stripe\'s mission?',
        'What are the biggest technical challenges in this area?',
        'How does Stripe balance speed with reliability?',
        'What does career growth look like here?',
        'How does the team handle on-call and operational work?'
      ],
      whatTheyValue: [
        'Technical depth and systems thinking',
        'Ownership and accountability',
        'Clear communication and writing skills',
        'Product thinking and user empathy',
        'Ability to work independently'
      ],
      timeline: 'Expect 3-6 weeks from application to offer. Process is typically efficient but thorough. Be prepared for technical depth.'
    },
    attribution: {
      facts: 'Sample source: Company website, press releases',
      culture: 'Sample source: Employee reviews, company blog',
      redFlags: 'Sample source: Employee feedback, industry analysis',
      interviewTips: 'Sample source: Interview guides, candidate experiences'
    }
  },
  andela: {
    profile: {
      name: 'Andela',
      industry: 'Technology / Talent Network',
      size: '1,000+ employees',
      location: 'Remote-first (Global)',
      founded: 2014,
      status: 'Private'
    },
    facts: [
      { label: 'Mission', value: 'Connect brilliant minds with opportunities', icon: 'ri-links-line' },
      { label: 'Talent Network', value: '150,000+ technologists globally', icon: 'ri-team-line' },
      { label: 'Client Base', value: 'Fortune 500 and high-growth startups', icon: 'ri-building-2-line' },
      { label: 'Geographic Reach', value: '80+ countries', icon: 'ri-earth-line' },
      { label: 'Funding', value: '$200+ million raised', icon: 'ri-funds-line' },
      { label: 'Work Model', value: '100% remote-first since founding', icon: 'ri-home-wifi-line' },
      { label: 'Focus Areas', value: 'Software engineering, data, design', icon: 'ri-code-box-line' },
      { label: 'Company Type', value: 'Talent marketplace and services', icon: 'ri-store-line' },
      { label: 'Growth Stage', value: 'Series E, scaling globally', icon: 'ri-rocket-2-line' },
      { label: 'Leadership', value: 'Jeremy Johnson (CEO)', icon: 'ri-user-star-line' }
    ],
    culture: {
      values: [
        'Excellence and continuous learning',
        'Diversity and inclusion',
        'Remote-first collaboration',
        'Transparency and trust',
        'Impact-driven work'
      ],
      workEnvironment: 'Fully remote, globally distributed teams. Strong emphasis on asynchronous communication and documentation. Culture values learning, growth, and connecting talent with opportunities. Collaborative environment with focus on professional development.',
      remotePolicy: '100% remote-first. No physical offices required. Employees work from anywhere with reliable internet. Occasional team meetups and offsites.',
      benefits: [
        'Competitive global compensation',
        'Health insurance (varies by location)',
        'Professional development budget',
        'Home office setup stipend',
        'Flexible work hours',
        'Paid time off',
        'Learning resources and courses',
        'Global team events'
      ]
    },
    redFlags: [
      {
        concern: 'Contractor vs employee dynamics',
        context: 'Some roles are contractor-based rather than full employment. Clarify employment type during interviews. Benefits may vary based on contract structure.',
        severity: 'medium'
      },
      {
        concern: 'Market volatility in tech talent space',
        context: 'Talent marketplace business models can be affected by economic cycles. However, Andela has shown resilience and adaptation.',
        severity: 'low'
      },
      {
        concern: 'Remote work requires strong self-management',
        context: 'Fully remote environment requires discipline and communication skills. Not ideal for those who prefer in-person collaboration.',
        severity: 'low'
      },
      {
        concern: 'Business model shifts over time',
        context: 'Andela has evolved its model from bootcamp to talent network. This shows adaptability but may create some organizational changes.',
        severity: 'low'
      }
    ],
    interviewTips: {
      format: 'Typically 3-5 rounds: recruiter call, technical assessment, technical interview, behavioral interview, and final round. Process is fully remote and may take 2-4 weeks.',
      commonQuestions: [
        'Technical assessment (coding challenges)',
        'Remote work experience and practices',
        'Communication and collaboration in distributed teams',
        'How you approach learning and growth',
        'Experience working across time zones'
      ],
      questionsToAsk: [
        'How does Andela support professional development?',
        'What does success look like in this role?',
        'How are remote teams structured and managed?',
        'What opportunities exist for career growth?',
        'How does Andela ensure work-life balance in a remote setting?'
      ],
      whatTheyValue: [
        'Strong technical skills',
        'Remote work proficiency',
        'Clear written and verbal communication',
        'Self-motivation and accountability',
        'Cultural awareness and global mindset'
      ],
      timeline: 'Expect 2-4 weeks from application to offer. Process is efficient and fully remote. Time zones may affect scheduling.'
    },
    attribution: {
      facts: 'Sample source: Company website, press releases',
      culture: 'Sample source: Employee reviews, company blog',
      redFlags: 'Sample source: Employee feedback, industry analysis',
      interviewTips: 'Sample source: Interview guides, remote work best practices'
    }
  }
};

export function getMockCompanyInsights(companyName: string): CompanyInsights | null {
  const normalizedName = companyName.toLowerCase().trim();
  return mockCompanies[normalizedName] || null;
}

export const PRESET_COMPANIES = ['Google', 'Stripe', 'Andela'];
