import adamPortrait from '../assets/images/Adam ak kelly.png';
import umairPortrait from '../assets/images/umair tariq (2).jpg';
import sherPortrait from '../assets/images/sher ali.jpeg';

// Ultra-fast, responsive WebP optimized service card images (average ~50KB per image, 94% size reduction)
import socialMediaImg from '../assets/images/services/social_media.webp';
import seoGrowthImg from '../assets/images/services/seo_growth.webp';
import paidAdsImg from '../assets/images/services/paid_ads.webp';
import localProfilesImg from '../assets/images/services/local_profiles.webp';
import websiteDesignImg from '../assets/images/services/website_design.webp';
import aiConsultationImg from '../assets/images/services/ai_consultation.webp';
import reputationManagementImg from '../assets/images/services/reputation_management.webp';
import crmAutomationsImg from '../assets/images/services/crm_automations.webp';
import videoEditingImg from '../assets/images/services/video_editing.webp';
import appDevelopmentImg from '../assets/images/services/app_development.webp';
import emailMarketingImg from '../assets/images/services/email_marketing.webp';
import visitorMarketingImg from '../assets/images/services/visitor_marketing.webp';

import {
  ServiceItem,
  ProjectItem,
  ProcessStep,
  AwardItem,
  TestimonialItem,
  TeamMember,
  BlogPost,
  FaqItem
} from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'social-media-marketing',
    number: '01',
    title: 'Social Media Management',
    category: 'BRAND AWARENESS & GROWTH',
    description: 'We bridge the gap between social media being produced and managed — one without the other is futile.',
    image: socialMediaImg,
    isFeatured: false,
    features: ['Omnichannel Content Strategy', 'Short-Form Video Production', 'Audience Growth & Moderation'],
    metrics: '+240% Average Engagement',
    ctaText: 'Grow My Social Presence'
  },
  {
    id: 'seo-organic-growth',
    number: '02',
    title: 'SEO and Organic Growth',
    category: 'AUTHORITY & SEARCH DOMINANCE',
    description: "Key to a company's long-term growth is more than running ads — it's building an organic presence that will pay out in sales for many years to come.",
    image: seoGrowthImg,
    isFeatured: true,
    features: ['Technical & Semantic SEO', 'High-Intent Content Strategy', 'Organic Keyword Dominance'],
    metrics: '3.8X Organic Traffic ROI',
    ctaText: 'Get My Free SEO Audit'
  },
  {
    id: 'paid-ads-management',
    number: '03',
    title: 'Paid Ads',
    category: 'FULL-FUNNEL ACQUISITION & SCALE',
    description: 'We leverage cutting-edge AI technology to find missed efficiencies across your digital advertising, plus a human element running the strategy.',
    image: paidAdsImg,
    isFeatured: false,
    features: ['AI Bid & Budget Optimization', 'Cross-Channel Media Buying', 'Human Creative Strategy'],
    metrics: '4.6X Average ROAS',
    ctaText: 'Maximize My Ad ROI'
  },
  {
    id: 'profile-optimizations',
    number: '04',
    title: 'Google / Yelp / Apple Page Optimizations',
    category: 'LOCAL SEARCH & REPUTATION AUTHORITY',
    description: "In a competitive digital landscape, every location your business is featured on needs ongoing management and optimization. That's where we step in.",
    image: localProfilesImg,
    isFeatured: false,
    features: ['Google Business Profile Setup', 'Apple Maps & Yelp Optimization', 'Citation & NAP Consistency'],
    metrics: '+240% Map Pack Discovery',
    ctaText: 'Claim My Local Listings'
  },
  {
    id: 'website-design',
    number: '05',
    title: 'Website Design & Development',
    category: 'HIGH-CONVERTING DIGITAL EXPERIENCE',
    description: 'We build websites that load fast, rank well, and are built to turn visitors into customers — not just look good.',
    image: websiteDesignImg,
    isFeatured: false,
    features: ['High-Velocity Page Loads', 'Conversion-Optimized UX', 'SEO Structural Foundation'],
    metrics: '99+ PageSpeed Score',
    ctaText: 'Launch My High-Converting Site'
  },
  {
    id: 'ai-consultation',
    number: '06',
    title: 'AI Consultation & Implementation',
    category: 'ENTERPRISE INTELLIGENCE & AUTOMATION',
    description: 'We help companies adapt and become better at the tasks they need to accomplish with AI — marketing workflows and operational efficiency.',
    image: aiConsultationImg,
    isFeatured: false,
    features: ['Workflow Automation Audits', 'Custom AI Agent Integration', 'Marketing AI Model Tuning'],
    metrics: '15+ Hours Saved Weekly',
    ctaText: 'Automate With Custom AI'
  },
  {
    id: 'reputation-management',
    number: '07',
    title: 'Reputation Management',
    category: 'TRUST & SOCIAL PROOF ENGINE',
    description: 'We monitor your reviews, manage responses, and build the kind of online trust that makes new customers pick you first.',
    image: reputationManagementImg,
    isFeatured: false,
    features: ['Automated Review Capture', '24/7 Response Monitoring', '5-Star Social Proof Engine'],
    metrics: '98% Positive Feedback',
    ctaText: 'Maximize My Brand Reputation'
  },
  {
    id: 'crm-automations',
    number: '08',
    title: 'CRM Systems & Business Automations',
    category: 'PIPELINE & SALES OPERATIONS',
    description: 'We build CRM and automation systems so leads stop falling through the cracks — less time in spreadsheets, more deals closed.',
    image: crmAutomationsImg,
    isFeatured: false,
    features: ['Zero-Leak Lead Routing', 'Multi-Stage Sales Pipelines', 'Automated SMS & Follow-ups'],
    metrics: '0 Leads Lost In Transit',
    ctaText: 'Streamline My Sales CRM'
  },
  {
    id: 'video-editing',
    number: '09',
    title: 'Video Editing',
    category: 'HIGH-RETENTION MEDIA PRODUCTION',
    description: 'We edit video for ads, social, and brand storytelling — built with pacing, sound design, and retention hooks that keep people watching.',
    image: videoEditingImg,
    isFeatured: false,
    features: ['Hook & Retention Optimization', 'Direct-Response Ad Cuts', 'Viral Short-Form Reels/TikTok'],
    metrics: '72% Average Watch Time',
    ctaText: 'Scale My Video Production'
  },
  {
    id: 'app-game-development',
    number: '10',
    title: 'App & Game Development',
    category: 'CUSTOM SOFTWARE & MOBILE',
    description: 'We build custom Android, iOS, and game projects from concept to launch with responsive UI, cloud logic, and native performance.',
    image: appDevelopmentImg,
    isFeatured: false,
    features: ['Native iOS & Android Architecture', 'Modern Game Engines & UI', 'Scalable Cloud Backend'],
    metrics: 'Cross-Platform Precision',
    ctaText: 'Develop My Custom App'
  },
  {
    id: 'email-marketing',
    number: '11',
    title: 'Email Marketing & Retention',
    category: 'RETENTION & REVENUE ENGINE',
    description: "We build and run email campaigns that turn your list into repeat customers, not just an inbox you're ignored in.",
    image: emailMarketingImg,
    isFeatured: false,
    features: ['High-Open Segmentation', 'Behavioral Flow Automations', 'VIP Re-Engagement Sprints'],
    metrics: '45%+ Average Open Rate',
    ctaText: 'Monetize My Email List'
  },
  {
    id: 'website-visitor-marketing',
    number: '12',
    title: 'Website Visitor Marketing',
    category: 'DE-ANONYMIZATION & RETARGETING',
    description: "Know who visited your website and contact high-intent visitors who haven't engaged before they purchase from competitors.",
    image: visitorMarketingImg,
    isFeatured: false,
    features: ['Identity Resolution Technology', 'Anonymous Visitor De-masking', 'Automated Follow-up Sequences'],
    metrics: '+320% Resolution Rate',
    ctaText: 'Identify My Website Visitors'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'real-estate-campaign',
    title: 'Social Campaign for Real Estate Agency',
    category: 'Social Media Marketing',
    tag: 'Social Media Marketing',
    description: 'Repositioning a premier luxury property group through targeted visual storytelling, high-converting video property tours, and VIP lead capture funnels.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    results: '+185% Qualified Leads',
    client: 'Aura Living Real Estate',
    year: '2024',
    deliverables: ['Paid Social Strategy', '3D Drone Videography', 'Lead Funnel Development', 'Meta Ads Management']
  },
  {
    id: 'dental-seo-ppc',
    title: 'SEO & PPC for Dental Clinic',
    category: 'Search Engine Marketing',
    tag: 'SEO, PPC',
    description: 'Dominating high-intent local search terms for cosmetic dentistry, resulting in a fully booked appointment schedule 6 months in advance.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
    results: '+3.2x Booked Appointments',
    client: 'Apex Dental Care Group',
    year: '2024',
    deliverables: ['Local SEO Optimization', 'Google Ads Search & Performance Max', 'Conversion Rate Audit', 'Call Tracking']
  },
  {
    id: 'yoga-studio-ads',
    title: 'Google Ads for Yoga Studio',
    category: 'Paid Advertising',
    tag: 'Paid Advertising',
    description: 'Scaling membership signups across boutique studio locations with hyper-targeted Google search and performance ad funnels.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200',
    results: '-42% Cost Per Click',
    client: 'Solstice Yoga Collective',
    year: '2024',
    deliverables: ['Geo-Targeted PPC', 'Creative Studio Production', 'Landing Page Optimization', 'SMS Referral System']
  },
  {
    id: 'fashion-ad-campaign',
    title: 'Instagram Ad Campaign for Fashion Brand',
    category: 'Brand Strategy',
    tag: 'Paid Advertising',
    description: 'A viral multi-format influencer and UGC-led campaign celebrating sustainable streetwear, driving record conversion numbers.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
    results: '+260% Revenue',
    client: 'Verve Sustainable Apparel',
    year: '2025',
    deliverables: ['Instagram Reels Creative', 'Influencer Seeding', 'TikTok Spark Ads', 'Custom Shopify Theme CRO']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discover & Strategize',
    description: 'We audit your market, competitors, and current performance to build a growth roadmap , not a template.',
    isHighlighted: false,
    deliverables: ['Market Landscape Audit', 'Competitor Gap Analysis', 'Custom Growth Roadmap', 'KPI & Revenue Architecture']
  },
  {
    stepNumber: '02',
    title: 'Execute & Optimize',
    description: 'Campaigns go live fast. We optimize in real time using data, not guesswork or "set it and forget it" management.',
    isHighlighted: true,
    deliverables: ['Rapid Campaign Launch', 'Real-Time Data Optimization', 'Conversion Asset Deployment', 'Creative Multi-Format Testing']
  },
  {
    stepNumber: '03',
    title: 'Analyze & Grow',
    description: 'Monthly reporting that shows real ROI, then we double down on what\'s working and cut what isn\'t.',
    isHighlighted: false,
    deliverables: ['Transparent ROI Reporting', 'Scale Top-Performing Channels', 'Cut Unprofitable Spend', 'Compounded Growth Sprint']
  }
];

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 'award-1',
    title: 'Digital Impact Award',
    category: 'Digital Marketing',
    year: '2022',
    organization: 'Global Agency Honors'
  },
  {
    id: 'award-2',
    title: 'PPC Power Performer',
    category: 'PPC',
    year: '2023',
    organization: 'Search & Performance Council'
  },
  {
    id: 'award-3',
    title: 'Brand Brilliance Award',
    category: 'Digital Branding & Identity',
    year: '2024',
    organization: 'International Design Awards'
  },
  {
    id: 'award-4',
    title: 'Content Genius Award',
    category: 'Content Marketing Strategy',
    year: '2025',
    organization: 'Editorial Excellence Summit'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Julian Hayes',
    role: 'VP of Growth & Operations',
    company: 'Apex Health Systems',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Our organic inbound patient inquiries were flat for nearly two years. Within 4 months of BOSSTYCOON rebuilding our technical SEO and high-intent keyword architecture, we dominated the top 3 spots in our region. Organic patient consultations jumped by +240%.',
    project: 'SEO and Organic Growth'
  },
  {
    id: 'test-2',
    name: 'Sarah Lindqvist',
    role: 'Managing Partner',
    company: 'Valor Hospitality Group',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Managing reviews across 14 hotel and restaurant locations was overwhelming. BOSSTYCOON deployed an automated 5-star review capture system that elevated our average Google rating from 3.9 to 4.8 while intercepting negative guest feedback before it ever went public.',
    project: 'Reputation Management'
  },
  {
    id: 'test-3',
    name: 'Dr. Tariq Al-Mansoor',
    role: 'Chief Technology Officer',
    company: 'Veridian BioTech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'The AI consultation and integration sprint by Adam and the BOSSTYCOON team saved our operations department 22+ hours every week. They implemented custom AI workflow automations that instantly triage customer inquiries without losing human polish.',
    project: 'AI Consultation & Implementation'
  },
  {
    id: 'test-4',
    name: 'David Sterling',
    role: 'Founder & Managing Broker',
    company: 'Sterling & Co. Luxury Real Estate',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Local search discovery is make-or-break for high-ticket brokerage. BOSSTYCOON took over our Google Business Profiles, Apple Maps, and local directory listings. Within 90 days we claimed the #1 Google 3-Pack spot across three luxury zip codes, yielding $14M in closed listings.',
    project: 'Google / Yelp / Apple Page Optimizations'
  },
  {
    id: 'test-5',
    name: 'Priya Sharma',
    role: 'Chief Operating Officer',
    company: 'Beacon Logistics Network',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Our sales reps were previously losing nearly 30% of warm enterprise leads due to spreadsheet bottlenecks. BOSSTYCOON architected a zero-leak CRM pipeline with instant SMS and email routing that accelerated our closing cycle by 3x.',
    project: 'CRM Systems & Business Automations'
  },
  {
    id: 'test-6',
    name: 'Nathan Cole',
    role: 'Head of Commercial Revenue',
    company: 'CloudScale SaaS Solutions',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Their website visitor identification technology blew our board away. We identified anonymous enterprise visitors who browsed our enterprise pricing tier, enabling our SDRs to book 48 high-intent demos in the first 30 days without extra ad spend.',
    project: 'Website Visitor Marketing'
  },
  {
    id: 'test-7',
    name: 'Chloe Bennett',
    role: 'Founder & CEO',
    company: 'Aeris Performance Activewear',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Our previous website had a sluggish 1.4% conversion rate. BOSSTYCOON built an ultra-fast, high-converting digital storefront from scratch. Our conversion rate jumped to 4.2% overnight, effectively tripling our monthly sales volume.',
    project: 'Website Design & Development'
  },
  {
    id: 'test-8',
    name: 'Marcus Vance',
    role: 'Chief Marketing Officer',
    company: 'Nexus FinTech Global',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'The level of strategic rigor, transparency in reporting, and creative media buying execution from the BOSSTYCOON team is unmatched. Our customer acquisition cost dropped 38% while scaling monthly ad spend across Meta and Google to seven figures profitably.',
    project: 'Paid Ads'
  },
  {
    id: 'test-9',
    name: 'Mateo Ramos',
    role: 'Executive Media Producer',
    company: 'Velocity Media & Brands',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Their pacing, sound design, and retention hooks took our video advertising from standard to viral. Average viewer watch times increased by 72%, directly powering over 3.2M organic impressions on our flagship commercial campaigns.',
    project: 'Video Editing'
  },
  {
    id: 'test-10',
    name: 'Elena Rostova',
    role: 'Founder & Creative Director',
    company: 'Lumière Haute Parfumerie',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    quote: 'Their email segmentation sprints and automated customer win-back flows drove an immediate 45% open rate and generated over 40% of our holiday revenue purely from our existing customer database. An essential partner for direct-to-consumer scale.',
    project: 'Email Marketing & Retention'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'ADAM AK KELLEY',
    role: 'Lead Customer Service / AI Specialist',
    image: adamPortrait,
    bio: 'Adam has spent 20 years in marketing for B2B and B2C clients. He has also successfully owned, operated, and sold multiple B2C, retail, wholesale, and e-commerce businesses',
    specialty: 'CUSTOMER SERVICE & AI SPECIALIST',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' }
  },
  {
    id: 'team-3',
    name: 'SHER ALI',
    role: 'Lead Media Buyer / Customer Support',
    image: sherPortrait,
    bio: 'With years of experience across multiple advertising platforms, Sher has successfully led his team running ads for 60+ companies concurrently, with combined ad budgets in the millions.',
    specialty: 'MEDIA BUYER & CUSTOMER SUPPORT',
    socials: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: "A Beginner's Guide to Running Profitable Ad Campaigns",
    tag: 'Paid Advertising',
    date: 'Aug 14',
    readTime: '5 min read',
    excerpt: 'Master the fundamentals of audience segmentation, bid strategies, and creative testing frameworks to guarantee positive return on ad spend.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900',
    author: 'Jenny Alexander',
    content: 'Running paid ad campaigns requires an understanding of algorithmic machine learning, creative diversity, and first-party attribution modeling...'
  },
  {
    id: 'blog-2',
    title: 'Top 10 SEO Strategies That Still Work',
    tag: 'SEO',
    date: 'Aug 08',
    readTime: '7 min read',
    excerpt: 'In the era of AI search and evolving algorithms, these proven foundational optimization tactics consistently win organic rankings.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=900',
    author: 'Olivia Hughes',
    content: 'Search intent has matured beyond raw keyword matching. Today, topical authority, information gain, and authoritative user experience dictate search visibility...'
  },
  {
    id: 'blog-3',
    title: 'Why Long-Form Content Still Dominates',
    tag: 'Content Marketing',
    date: 'Jul 29',
    readTime: '6 min read',
    excerpt: 'Discover why high-depth research, comprehensive guides, and original industry data continue to outperform superficial short pieces.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=900',
    author: 'Sophia Lewis',
    content: 'Long-form editorial pieces establish permanent brand equity. When prospective clients seek high-ticket partners, in-depth thought leadership builds the necessary trust...'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What makes Boss Tycoon different from other digital marketing agencies?',
    answer: 'We build integrated systems, not one-off tactics — website, ads, SEO, AI automation, and reputation all working together toward the same growth number, instead of siloed services that don\'t talk to each other.',
    category: 'Approach'
  },
  {
    id: 'faq-2',
    question: 'What industries and business sizes do you work with?',
    answer: 'We work primarily with local service businesses and growing regional brands — home services, healthcare, professional services, and similar — from single-location businesses to multi-location operators looking to scale.',
    category: 'Clients'
  },
  {
    id: 'faq-3',
    question: 'Do you require long-term contracts?',
    answer: 'We structure most engagements month-to-month after an initial onboarding period, because we\'d rather earn your business every month with results than lock you in. Specific terms depend on the scope of the project (a full website build, for example, is a fixed project, not a subscription).',
    category: 'Contracts'
  },
  {
    id: 'faq-4',
    question: 'How much does it cost to work with Boss Tycoon?',
    answer: 'Pricing depends entirely on which services and scope you need — a single SEO engagement looks very different from a full growth stack with ads, automation, and content. We quote after a strategy call so you\'re not paying for services you don\'t actually need yet.',
    category: 'Pricing'
  },
  {
    id: 'faq-6',
    question: 'Do you work with businesses outside of California?',
    answer: 'Yes. We\'re based in Escondido, California, but manage clients across the U.S. Most of our work (ads, SEO, website, automation) is fully remote-deliverable regardless of your location.',
    category: 'Locations'
  }
];
