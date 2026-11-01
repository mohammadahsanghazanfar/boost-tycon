import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenQuote: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenQuote }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
              <span>✦</span>
              <span>THE RECEIPTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic leading-tight">
              Client <span className="text-[#C6FF00] not-italic">Testimonials</span>
            </h2>
          </div>

          <div>
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 bg-[#141716] hover:bg-[#1E2220] text-[#C6FF00] border border-white/10 hover:border-[#C6FF00]/40 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              <span>View All Endorsements ➔</span>
            </button>
          </div>
        </div>

        {/* 2-Column Testimonial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Overall Rating Box */}
          <div className="lg:col-span-4 bg-[#141716] text-white p-8 rounded-[36px] border border-white/10 flex flex-col justify-between space-y-8 shadow-2xl">
            <div>
              <div className="text-6xl font-black text-white tracking-tight mb-3">
                4.9<span className="text-[#C6FF00]">/5</span>
              </div>
              <div className="flex items-center gap-1 text-[#C6FF00] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-[11px] font-black text-white/50 uppercase tracking-widest">
                (40+ Verifiable Audit Reviews)
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm font-bold text-white/80 uppercase tracking-wide leading-snug">
                Customer experiences that establish market benchmark standards.
              </p>
            </div>
          </div>

          {/* Right: Active Testimonial Card with Slider Controls */}
          <div className="lg:col-span-8 bg-[#141716] p-8 sm:p-12 rounded-[36px] border border-white/10 shadow-2xl flex flex-col justify-between relative">
            <div className="space-y-6">
              
              {/* Star rating, Service Badge & Quote icon */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[#C6FF00]">
                    <span className="font-black text-lg mr-1 text-white">{current.rating.toFixed(1)}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C6FF00] text-[#C6FF00]" />
                    ))}
                  </div>
                  {current.project && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] text-[11px] font-black uppercase tracking-wider">
                      <span>✦</span>
                      <span>{current.project}</span>
                    </span>
                  )}
                </div>
                <Quote className="w-10 h-10 text-white/10 stroke-[1.5]" />
              </div>

              {/* Quote Text */}
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed tracking-tight italic">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author and Project Details */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-4">
                <div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight">
                    {current.name}
                  </h4>
                  <p className="text-xs text-white/50 font-light">
                    {current.role}
                  </p>
                </div>

                <div className="text-xs font-black uppercase tracking-widest text-white/40">
                  Verified Client Review <span className="text-[#C6FF00]">#{currentIndex + 1}</span> of {TESTIMONIALS_DATA.length}
                </div>
              </div>
            </div>

            {/* Slider Navigation Buttons and Indicators */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5 flex-wrap">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS_DATA.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Go to review ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      dotIdx === currentIndex
                        ? 'w-7 bg-[#C6FF00]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 rounded-full bg-[#1E2220] hover:bg-[#C6FF00] text-white hover:text-[#0A0C0B] border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-11 h-11 rounded-full bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,0,0.3)]"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
