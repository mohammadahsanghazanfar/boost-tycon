import React from 'react';
import { AWARDS_DATA } from '../data/mockData';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const AwardsBanner: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      {/* Background radial accent */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6FF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest mb-6">
          <span>✦</span>
          <span>Accolades // Honors</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Heading & Rotating Seal */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white uppercase italic">
              A Legacy Of <br className="hidden sm:inline" />
              <span className="text-[#C6FF00] not-italic">Recognized Impact</span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light max-w-md">
              Industry recognition is a testament to the real-world metrics, creative originality, and relentless work ethic we deliver for every partner.
            </p>

            {/* Circular Embossed Star Badge */}
            <div className="relative w-40 h-40 rounded-full bg-[#141716] border border-white/10 flex items-center justify-center p-4 shadow-2xl">
              <div className="absolute inset-2 rounded-full border border-dashed border-[#C6FF00]/40 animate-spin-slow" />
              <div className="w-16 h-16 rounded-full bg-[#C6FF00] text-[#0A0C0B] flex items-center justify-center shadow-[0_0_25px_rgba(198,255,0,0.4)]">
                <Sparkles className="w-8 h-8 fill-current" />
              </div>
            </div>
          </div>

          {/* Right: Awards Stack List */}
          <div className="lg:col-span-7 space-y-4">
            {AWARDS_DATA.map((award) => (
              <div
                key={award.id}
                className="bg-[#141716] hover:bg-[#1A1D1C] rounded-2xl p-6 border border-white/10 hover:border-[#C6FF00]/60 transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer shadow-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black text-[#C6FF00] uppercase tracking-widest">
                      {award.category}
                    </span>
                    <span className="text-xs text-white/40 font-mono">
                      / {award.year}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase group-hover:text-[#C6FF00] transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-xs text-white/50 font-light">
                    Presented by {award.organization}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#1E2220] text-[#C6FF00] group-hover:bg-[#C6FF00] group-hover:text-[#0A0C0B] flex items-center justify-center shrink-0 transition-all">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
