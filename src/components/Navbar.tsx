import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenQuote: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0C0B]/95 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'bg-[#0A0C0B] border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Cherub Emblem & BOSSTYCOON Name */}
          <a href="#home" className="group flex items-center" aria-label="BOSSTYCOON Home">
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-bold tracking-wider uppercase" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#C6FF00]'
                      : 'text-[#F5F5F4]/70 hover:text-[#C6FF00]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6FF00]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="border border-[#C6FF00] text-[#C6FF00] px-6 py-2.5 rounded-full text-[12px] font-extrabold uppercase hover:bg-[#C6FF00] hover:text-[#0A0C0B] transition-all flex items-center gap-2 tracking-wider group cursor-pointer shadow-[0_0_20px_rgba(198,255,0,0.15)] hover:shadow-[0_0_25px_rgba(198,255,0,0.35)]"
            >
              <span>Book a Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-[#141716] border border-white/10 text-[#F5F5F4] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C6FF00]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden bg-[#141716] border-b border-white/10 px-6 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-[#F5F5F4] hover:bg-white/5 hover:text-[#C6FF00] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#C6FF00] text-[#0A0C0B] py-3.5 px-6 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(198,255,0,0.25)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book a Call →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

