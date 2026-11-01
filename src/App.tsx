import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { StatsBar } from './components/StatsBar';
import { ServicesSection } from './components/ServicesSection';
import { QuoteContactSection } from './components/QuoteContactSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TeamSection } from './components/TeamSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

import { QuoteModal } from './components/QuoteModal';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { BlogModal } from './components/BlogModal';

import { ProjectItem, ServiceItem, BlogPost } from './types';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'services', 'team', 'blogs', 'contact'];
          const scrollPos = window.scrollY + 200;

          for (const sec of sections) {
            const el = document.getElementById(sec);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection(sec);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuote = (serviceTitle?: unknown) => {
    const title = typeof serviceTitle === 'string' ? serviceTitle : undefined;
    setSelectedQuoteService(title);
    setIsQuoteOpen(true);
  };
  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setSelectedQuoteService(undefined);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0C0B] text-[#F5F5F4] font-sans antialiased selection:bg-[#C6FF00] selection:text-[#0A0C0B]">
      {/* 1. Top Green Information Bar */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        activeSection={activeSection}
      />

      {/* Main Content Sections Flow */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onOpenQuote={handleOpenQuote}
          onExploreServices={scrollToServices}
        />

        {/* 4. Marquee Ticker */}
        <MarqueeTicker variant="dark" animate={false} />

        {/* 4b. Stats Metrics Bar */}
        <StatsBar />

        {/* 6. Strategic Services Section (All 12 Services in Continuous Animated Stream) */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenQuote={handleOpenQuote}
        />

        {/* 7. Marquee Ticker */}
        <MarqueeTicker variant="dark" reverse={true} />

        {/* 15. Testimonials (Trusted by Our Clients) */}
        <TestimonialsSection onOpenQuote={handleOpenQuote} />

        {/* 16. Marquee Ticker */}
        <MarqueeTicker variant="dark" animate={false} />

        {/* 17. Meet Our Expert Team */}
        <TeamSection />

        {/* 17b. Marquee Ticker */}
        <MarqueeTicker variant="dark" reverse={true} />

        {/* 18. FAQs (Question? Look here.) */}
        <FaqSection onOpenQuote={handleOpenQuote} />

        {/* 18b. Marquee Ticker */}
        <MarqueeTicker variant="dark" animate={false} />

        {/* 20. Publications & Blog Section */}
        <BlogSection
          onSelectBlog={(blog) => setSelectedBlog(blog)}
          onOpenQuote={handleOpenQuote}
        />

        {/* 20b. Marquee Ticker */}
        <MarqueeTicker variant="dark" reverse={true} />

        {/* 12. Interactive Quote / Contact Section */}
        <QuoteContactSection />

        {/* 19. Marquee Ticker Above Footer */}
        <MarqueeTicker variant="dark" animate={false} />
      </main>

      {/* 21. Footer (Let's Connect there) */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialService={selectedQuoteService}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuote={handleOpenQuote}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuote={handleOpenQuote}
      />

      <BlogModal
        post={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onOpenQuote={handleOpenQuote}
      />
    </div>
  );
}
