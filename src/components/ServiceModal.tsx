import React, { useEffect } from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onOpenQuote
}) => {
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="bg-[#141716] rounded-[36px] w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col text-[#F5F5F4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A0C0B] text-white p-6 sm:p-8 flex items-center justify-between border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C6FF00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.category}</span>
            </div>
            <h3 id="service-modal-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase italic">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close service modal"
            className="w-10 h-10 rounded-full bg-[#1E2220] hover:bg-[#C6FF00] text-white hover:text-[#0A0C0B] flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-black/40 border border-white/10">
            <img
              src={service.image}
              alt={service.title}
              width={720}
              height={450}
              decoding="async"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
            {service.description}
          </p>

          {/* Included Features */}
          <div className="space-y-3 pt-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#C6FF00]">
              Core Capabilities & Sprints
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-bold text-white bg-[#1E2220] p-3 rounded-xl border border-white/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {service.metrics && (
              <span className="text-xs font-black uppercase tracking-wider text-[#C6FF00] bg-[#1E2220] px-3.5 py-1.5 rounded-full border border-[#C6FF00]/40">
                ⚡ {service.metrics}
              </span>
            )}
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(198,255,0,0.25)]"
            >
              <span>{service.ctaText || 'Request Service Scope'}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
