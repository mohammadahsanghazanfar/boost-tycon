import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { Plus, Minus, MessageSquare, PhoneCall, ArrowUpRight } from 'lucide-react';

interface FaqSectionProps {
  onOpenQuote: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenQuote }) => {
  const [openId, setOpenId] = useState<string>('faq-2');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
            <span>✦</span>
            <span>STILL HAVE QUESTIONS?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic leading-tight">
            Frequently Asked <br />
            <span className="text-[#C6FF00] not-italic">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light">
            Direct answers regarding our deliverables, sprint onboarding, and partnership agreements.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Accordion List */}
          <div className="lg:col-span-8 space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                    isOpen
                      ? 'bg-[#141716] text-white border-[#C6FF00] shadow-[0_0_25px_rgba(198,255,0,0.15)]'
                      : 'bg-[#141716] text-[#F5F5F4] border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-black text-base sm:text-lg tracking-tight uppercase">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen
                          ? 'bg-[#C6FF00] text-[#0A0C0B]'
                          : 'bg-[#1E2220] text-white'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                      className="px-6 pb-6 pt-0 text-sm leading-relaxed text-white/70 font-light border-t border-white/10 mt-2 animate-in fade-in duration-200"
                    >
                      <p className="pt-4">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Quick Help & 24/7 Call Cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card 1: Have different questions? */}
            <div className="bg-[#141716] text-white p-8 rounded-[36px] border border-white/10 space-y-6 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#1E2220] text-[#C6FF00] flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase mb-2">
                  Custom Requirements?
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Our senior strategic leads are available to evaluate your growth trajectory and craft a bespoke scope.
                </p>
              </div>

              <button
                onClick={() => onOpenQuote()}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(198,255,0,0.25)]"
              >
                <span>Request Custom Brief</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Card 2: 24/7 Service */}
            <div className="bg-[#141716] p-7 rounded-[36px] border border-white/10 flex items-center gap-5 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#1E2220] text-[#C6FF00] flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6 text-[#C6FF00]" />
              </div>
              <div>
                <span className="text-[10px] font-black text-[#C6FF00] uppercase tracking-widest block">
                  Direct Line // California
                </span>
                <a
                  href="tel:+17608237778"
                  className="text-base sm:text-lg font-black text-white hover:text-[#C6FF00] transition-colors"
                >
                  (760) 823-7778
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
