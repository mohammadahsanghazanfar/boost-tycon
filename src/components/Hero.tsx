import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BossTycoonHeroAnimation } from './BossTycoonHeroAnimation';

interface HeroProps {
  onOpenQuote?: () => void;
  onExploreServices?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section
      id="home"
      className="relative bg-[#070908] text-[#F5F5F4] overflow-hidden border-b border-white/10 selection:bg-[#C6FF00] selection:text-[#0A0C0B]"
    >
      {/* Central Ambient Lighting for Deep Obsidian Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#C6FF00]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-[#10B981]/8 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-20 w-full px-0 py-16 sm:py-24 md:py-32 flex flex-col justify-center items-center min-h-[720px] sm:min-h-[820px] md:min-h-[900px] lg:min-h-[940px]">
        
        {/* Kinetic WE ARE BOSS TYCOON Animated Typography */}
        <div className="w-full flex items-center justify-center overflow-visible">
          <BossTycoonHeroAnimation letterFill="#FFFFFF" ribbonColor="#C6FF00" />
        </div>

        {/* Content down below the animated area */}
        <div className="w-full max-w-4xl mx-auto px-4 text-center mt-8 sm:mt-12 md:mt-14 flex flex-col items-center">
          <h2
            style={{ fontSize: 'clamp(1.375rem, 2vw + 0.55rem, 2.2rem)' }}
            className="font-black text-white uppercase tracking-tight text-center leading-[1.12] font-display drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
          >
            Aggressive Growth for Businesses{' '}
            <span className="text-[#C6FF00] drop-shadow-[0_0_30px_rgba(198,255,0,0.4)]">
              Ready to Scale
            </span>
          </h2>

          <p className="text-white/85 max-w-2xl sm:max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal mt-4 sm:mt-5 mb-6 sm:mb-8 text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Boss Tycoon helps local businesses and national brands grow through AI implementation, digital strategy, paid advertising, automation, and high-performance marketing systems.
          </p>

          <button
            onClick={() => onOpenQuote?.()}
            className="bg-[#D4FF00] hover:bg-[#b8e600] text-[#0A0C0B] px-8 sm:px-10 py-4 rounded-full font-black uppercase text-xs sm:text-sm flex items-center gap-3 shadow-[0_0_35px_rgba(212,255,0,0.45)] hover:shadow-[0_0_50px_rgba(212,255,0,0.65)] transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <span>Start Your Transformation</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </section>
  );
};
