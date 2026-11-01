export interface ServiceItem {
  id: string;
  number?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  isFeatured?: boolean;
  features: string[];
  metrics?: string;
  ctaText?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  image: string;
  results: string;
  client: string;
  year: string;
  deliverables: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  isHighlighted?: boolean;
  deliverables: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  category: string;
  year: string;
  organization: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  project: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialty: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
  content: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
