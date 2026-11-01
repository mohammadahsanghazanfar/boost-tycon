import React, { useState } from 'react';
import { ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import footerLogoImg from '../assets/images/regenerated_image_1787517699881.png';

interface FooterProps {
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const [footerEmail, setFooterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail) return;
    setSubmitted(true);
  };

  return (
    <footer className="bg-[#0A0C0B] text-[#F5F5F4] pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Top CTA Banner Bar: Let's Connect */}
        <div className="pb-16 mb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C6FF00] block">
              READY WHEN YOU ARE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase italic leading-tight">
              Let&apos;s Build <span className="text-[#C6FF00] not-italic">Something Bold</span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              Your competitors are already scaling. The only question is whether you move now or watch them win the market.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-3 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-9 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(198,255,0,0.25)] hover:shadow-[0_0_35px_rgba(198,255,0,0.4)] active:scale-95 group cursor-pointer"
            >
              <span>Start My Growth Conversation</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="tel:+17608237778"
              className="inline-flex items-center gap-2 bg-[#141716] hover:bg-[#1E2220] text-white hover:text-[#C6FF00] px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-colors border border-white/10"
            >
              <span>(760) 823-7778</span>
            </a>
          </div>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="inline-block group">
              <BrandLogo size="md" imageSrc={footerLogoImg} />
            </a>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-sm">
              We empower ambitious enterprises with performance-led digital campaigns, bespoke organic discovery systems, and strategic creative direction.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#C6FF00]">
              Explore
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/60 font-light">
              <li><a href="#services" className="hover:text-[#C6FF00] transition-colors">Services</a></li>
              <li><a href="#team" className="hover:text-[#C6FF00] transition-colors">Our Team</a></li>
              <li><a href="#blogs" className="hover:text-[#C6FF00] transition-colors">Blogs</a></li>
              <li><a href="#contact" className="hover:text-[#C6FF00] transition-colors">Book a Call</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#C6FF00]">
              Location & Contact
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-white/60 font-light">
              <div>
                <span className="text-white/40 text-[10px] font-black uppercase tracking-wider block">PHONE</span>
                <a href="tel:+17608237778" className="font-medium text-white/80 hover:text-[#C6FF00] transition-colors">
                  (760) 823-7778
                </a>
              </div>
              <div>
                <span className="text-white/40 text-[10px] font-black uppercase tracking-wider block">EMAIL</span>
                <a href="mailto:contact@bosstycoonmarketing.com" className="font-medium text-white/80 hover:text-[#C6FF00] transition-colors">
                  contact@bosstycoonmarketing.com
                </a>
              </div>
              <div>
                <span className="text-white/40 text-[10px] font-black uppercase tracking-wider block">CALIFORNIA OFFICE</span>
                <p className="font-light leading-relaxed text-white/90">Escondido CA 92025, California</p>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#C6FF00]">
              Executive Dispatch
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Subscribe to our agency growth briefings and algorithm telemetry updates.
            </p>

            {submitted ? (
              <div className="flex items-center gap-2 text-xs font-black text-[#C6FF00] pt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed to Executive Dispatch</span>
              </div>
            ) : (
              <form onSubmit={handleFooterSubmit} className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="w-full bg-[#141716] text-xs font-medium text-white placeholder:text-white/30 px-4 py-3.5 rounded-full border border-white/10 focus:outline-none focus:border-[#C6FF00] pr-12"
                />
                <button
                  type="submit"
                  aria-label="Submit email"
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 rounded-full bg-[#C6FF00] text-[#0A0C0B] flex items-center justify-center hover:bg-[#b2e600] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-light">
          <p>
            © {new Date().getFullYear()} BOSSTYCOON Agency. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#home" className="hover:text-white transition-colors">Privacy Architecture</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
