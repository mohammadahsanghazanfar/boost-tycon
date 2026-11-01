import React, { useState } from 'react';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { MarketingSurveyCalendar } from './MarketingSurveyCalendar';

export const QuoteContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
            <span>✦</span>
            <span>YOUR NEXT MOVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic leading-tight">
            Every Business Transformation <br className="hidden sm:inline" />
            Starts With <span className="text-[#C6FF00] not-italic">A Call</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Book a call with us for a free consultation on what we can do to elevate your digital footprint.
          </p>
        </div>

        {/* 2-Column Grid: Form + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Send a Message Form + Contact Chips */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#141716] p-8 sm:p-10 rounded-[36px] border border-white/10 shadow-2xl relative">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mb-6">
                Send a Message
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#C6FF00] text-[#0A0C0B] mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(198,255,0,0.4)]">
                    <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    Thank You, {formData.name || 'Partner'}!
                  </h3>
                  <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
                    Your message has been received. Our team will review your inquiry and get in touch with you at <span className="font-bold text-[#C6FF00]">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-4 px-8 py-3 rounded-full bg-[#C6FF00] text-[#0A0C0B] text-xs font-black uppercase tracking-wider hover:bg-[#b2e600] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-xs font-black uppercase tracking-wider text-white/80">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#1E2220] px-4 py-3.5 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00] transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="block text-xs font-black uppercase tracking-wider text-white/80">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="(760) 823-7778"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#1E2220] px-4 py-3.5 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-black uppercase tracking-wider text-white/80">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1E2220] px-4 py-3.5 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-xs font-black uppercase tracking-wider text-white/80">
                      How can we help you grow? *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Describe your revenue targets, current bottlenecks, and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#1E2220] px-4 py-3.5 rounded-xl border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00] focus:ring-1 focus:ring-[#C6FF00] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(198,255,0,0.25)] hover:shadow-[0_0_35px_rgba(198,255,0,0.4)] active:scale-95 group cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: 30-Minute Marketing Survey Calendar Widget */}
          <div className="lg:col-span-6 relative">
            <MarketingSurveyCalendar />
          </div>

        </div>

      </div>
    </section>
  );
};
