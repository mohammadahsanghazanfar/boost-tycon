import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="py-20 md:py-28 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 text-center space-y-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
          <span>✦</span>
          <span>STAY AHEAD</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic leading-tight">
          Get Growth Tactics <br />
          <span className="text-[#C6FF00] not-italic">Before Your Competitors Do</span>
        </h2>

        <p className="text-sm sm:text-base text-white/60 font-light max-w-lg mx-auto leading-relaxed">
          Real marketing insight, no fluff — delivered only when we have something worth saying.
        </p>

        {/* Form */}
        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-[#141716] border border-[#C6FF00] px-8 py-4 rounded-full text-xs font-black uppercase text-[#C6FF00] animate-in fade-in shadow-[0_0_20px_rgba(198,255,0,0.2)]">
            <CheckCircle2 className="w-5 h-5 text-[#C6FF00]" />
            <span>You&apos;re subscribed. Look for the next issue in your inbox.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3 p-2 bg-[#141716] rounded-full border border-white/10 shadow-2xl focus-within:border-[#C6FF00]/60 transition-all"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Executive Email Address
            </label>
            <div className="flex items-center gap-3 pl-4 w-full">
              <Mail className="w-4 h-4 text-white/40" />
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter executive email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-2.5 text-xs font-bold text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(198,255,0,0.25)] active:scale-95"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
