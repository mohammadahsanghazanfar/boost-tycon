import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialService }) => {
  const safeService = typeof initialService === 'string' && initialService ? initialService : 'Social Media Management';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$5,000 - $10,000 / mo',
    service: safeService,
    notes: ''
  });

  useEffect(() => {
    if (isOpen && typeof initialService === 'string' && initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [isOpen, initialService]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div
        className="bg-[#141716] rounded-[36px] w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col text-[#F5F5F4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A0C0B] text-white p-6 sm:p-8 flex items-center justify-between border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C6FF00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{initialService ? `Focus Area // ${initialService}` : 'Consultation & Audit Request'}</span>
            </div>
            <h3 id="quote-modal-title" className="text-2xl font-black text-white tracking-tight uppercase italic">
              Initiate Your <span className="text-[#C6FF00] not-italic">Growth Sprint</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quote modal"
            className="w-10 h-10 rounded-full bg-[#1E2220] hover:bg-[#C6FF00] text-white hover:text-[#0A0C0B] flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C6FF00] text-[#0A0C0B] mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(198,255,0,0.4)]">
                <CheckCircle className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                Request Dispatched!
              </h4>
              <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <span className="font-bold text-[#C6FF00]">{formData.name}</span>. Our growth director is analyzing your brand profile and will reach out to <span className="font-bold text-[#C6FF00]">{formData.email}</span> shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3.5 rounded-full bg-[#C6FF00] text-[#0A0C0B] text-xs font-black uppercase tracking-wider hover:bg-[#b2e600] cursor-pointer shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-black uppercase tracking-wider text-white/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1E2220] px-4 py-3 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
                <div>
                  <label htmlFor="quote-email" className="block text-xs font-black uppercase tracking-wider text-white/80 mb-1">
                    Work Email *
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1E2220] px-4 py-3 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-company" className="block text-xs font-black uppercase tracking-wider text-white/80 mb-1">
                    Company / Website
                  </label>
                  <input
                    id="quote-company"
                    type="text"
                    placeholder="yourbrand.com"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#1E2220] px-4 py-3 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
                <div>
                  <label htmlFor="quote-budget" className="block text-xs font-black uppercase tracking-wider text-white/80 mb-1">
                    Monthly Budget
                  </label>
                  <select
                    id="quote-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#1E2220] px-4 py-3 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="$3,500 - $5,000 / mo" className="bg-[#141716]">
                      $3,500 - $5,000 / mo
                    </option>
                    <option value="$5,000 - $10,000 / mo" className="bg-[#141716]">
                      $5,000 - $10,000 / mo
                    </option>
                    <option value="$10,000 - $25,000 / mo" className="bg-[#141716]">
                      $10,000 - $25,000 / mo
                    </option>
                    <option value="$25,000+ / mo" className="bg-[#141716]">
                      $25,000+ / mo (Enterprise)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quote-service" className="block text-xs font-black uppercase tracking-wider text-white/80 mb-1">
                  Primary Focus Area
                </label>
                <select
                  id="quote-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#1E2220] px-4 py-3 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#C6FF00]"
                >
                  {SERVICES_DATA.map((service) => (
                    <option key={service.id} value={service.title} className="bg-[#141716]">
                      {service.title}
                    </option>
                  ))}
                  <option value="Full Agency Growth Partner (All-In-One)" className="bg-[#141716]">
                    Full Agency Growth Partner (All-In-One)
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="quote-notes" className="block text-xs font-black uppercase tracking-wider text-white/80 mb-1">
                  Project Notes & Timeline
                </label>
                <textarea
                  id="quote-notes"
                  rows={3}
                  placeholder="Share any specific targets or challenges..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#1E2220] px-4 py-3 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] py-4 rounded-full font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(198,255,0,0.25)] hover:shadow-[0_0_35px_rgba(198,255,0,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Transmitting...' : 'Submit Proposal Request'}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
