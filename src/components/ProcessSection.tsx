import React from 'react';
import { PROCESS_STEPS } from '../data/mockData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onOpenQuote?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="process" className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
              <span>✦</span>
              <span>HOW WE MOVE FAST</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic leading-tight">
              A Systematic Sprint <br />
              To <span className="text-[#C6FF00] not-italic">Exponential Scale</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base text-white/60 leading-relaxed font-light">
              Our proven execution framework eliminates guesswork. We follow a rapid, data-grounded roadmap tailored to accelerate customer acquisition and maximize lifetime brand equity.
            </p>
          </div>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const isHighlighted = step.isHighlighted;

            return (
              <div
                key={step.stepNumber}
                className={`rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border relative group ${
                  isHighlighted
                    ? 'bg-[#141716] border-[#C6FF00] shadow-[0_0_35px_rgba(198,255,0,0.15)] ring-1 ring-[#C6FF00]'
                    : 'bg-[#141716] border-white/10 hover:border-[#C6FF00]/40'
                }`}
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`text-xs font-black tracking-widest px-4 py-1.5 rounded-full uppercase ${
                        isHighlighted
                          ? 'bg-[#C6FF00] text-[#0A0C0B]'
                          : 'bg-[#1E2220] text-[#C6FF00] border border-white/10'
                      }`}
                    >
                      PHASE {step.stepNumber}
                    </span>

                    <span className="text-4xl font-black text-white/20 group-hover:text-[#C6FF00] transition-colors">
                      0{step.stepNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <span className="text-xs font-black text-[#C6FF00] uppercase tracking-wider block mb-2">
                      Key Deliverables:
                    </span>
                    {step.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6FF00] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Step Indicator Arrow */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0A0C0B] border border-white/20 shadow-xl items-center justify-center text-[#C6FF00]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {onOpenQuote && (
          <div className="mt-14 text-center">
            <button
              onClick={() => onOpenQuote?.()}
              className="inline-flex items-center gap-3 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-9 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(198,255,0,0.2)] hover:shadow-[0_0_35px_rgba(198,255,0,0.35)] cursor-pointer group"
            >
              <span>Start My Growth Sprint</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
