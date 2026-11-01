import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
// This is the about section of the website

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuote }) => {
  const [skills] = useState([
    { name: 'Marketing & Business Growth Strategy', percentage: 95 },
    { name: 'Creativity, Branding & Innovation', percentage: 92 },
    { name: 'Financial & Media ROI Management', percentage: 97 },
  ]);

  return (
    <section id="about" className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Top Grid: Image Collage + Description & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: 4-Photo Editorial Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4 relative">
              
              {/* Decorative Lime Star Badge in center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-[#C6FF00] border-4 border-[#0A0C0B] shadow-[0_0_30px_rgba(198,255,0,0.3)] flex items-center justify-center text-[#0A0C0B]">
                <Sparkles className="w-8 h-8 fill-current" />
              </div>

              {/* Top Left Image */}
              <div className="rounded-3xl overflow-hidden bg-[#141716] border border-white/10 shadow-xl aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                  alt="Team brainstorming session"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Top Right Image */}
              <div className="rounded-3xl overflow-hidden bg-[#141716] border border-white/10 shadow-xl aspect-[4/5] -mt-6">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
                  alt="Creative strategy discussion"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Bottom Left Image */}
              <div className="rounded-3xl overflow-hidden bg-[#141716] border border-white/10 shadow-xl aspect-[4/5] -mb-6">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"
                  alt="Agency team collaboration"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Bottom Right Image */}
              <div className="rounded-3xl overflow-hidden bg-[#141716] border border-white/10 shadow-xl aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
                  alt="Digital campaign testing"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right: Copy & Progress Sliders */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
              <span>✦</span>
              <span>ABOUT BOSS TYCOON // DIGITAL MARKETING AGENCY</span>
            </div>

            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight italic">
              We Don&apos;t Do &ldquo;Marketing.&rdquo; <br className="hidden sm:inline" />
              We Do <span className="text-[#C6FF00] not-italic">Market Domination</span>.
            </h2>

            {/* Paragraph */}
            <p className="text-base text-white/70 leading-relaxed font-light">
              Most agencies sell you activity — posts, ads, reports. We sell outcomes. Boss Tycoon combines aggressive paid media strategy, data-backed SEO, and conversion-focused design into one growth engine built around your revenue goals, not our billable hours. Every campaign we run is tied to a number you actually care about: leads, sales, or ROI.
            </p>

            {/* Progress Bars */}
            <div className="space-y-6 pt-2">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    <span>{skill.name}</span>
                    <span className="text-[#C6FF00] font-black">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#1E2220] rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-[#C6FF00] rounded-full transition-all duration-1000 relative shadow-[0_0_10px_rgba(198,255,0,0.5)]"
                      style={{ width: `${skill.percentage}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#0A0C0B] rounded-full border border-[#C6FF00]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-3 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-8 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(198,255,0,0.2)] hover:shadow-[0_0_35px_rgba(198,255,0,0.35)] group cursor-pointer"
              >
                <span>Partner With a Results-First Team</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
