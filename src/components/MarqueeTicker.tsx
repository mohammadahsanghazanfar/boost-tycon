import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
  variant?: 'neon' | 'dark' | 'outline';
  reverse?: boolean;
  animate?: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = [
    'Website Design',
    'Paid Ads',
    'SEO & Organic Growth',
    'AI Consultation & Implementation',
    'Google, Yelp & Apple Business Profile Management',
    'CRM Systems & Business Automations',
    'Video Editing',
    'App & Game Development',
    'Email Marketing',
    'Social Media Management',
    'Website Visitor Marketing',
  ],
  variant = 'neon',
  reverse = false,
  animate = true
}) => {
  const fullItems = [...items, ...items, ...items, ...items];

  const variantStyles = {
    neon: 'bg-[#C6FF00] text-[#0A0C0B] py-3.5 sm:py-4.5 border-y-2 sm:border-y-4 border-[#0A0C0B]',
    dark: 'bg-[#141716] text-[#F5F5F4] py-3 sm:py-4 border-y border-white/10',
    outline: 'bg-[#0A0C0B] text-white py-3 border-y border-white/10'
  };

  return (
    <div className={`overflow-x-auto scrollbar-none select-none relative ${variantStyles[variant]}`}>
      <div 
        className={`flex items-center gap-10 sm:gap-12 whitespace-nowrap ${
          animate ? (reverse ? 'animate-marquee-reverse' : 'animate-marquee') : ''
        }`}
        style={!animate ? { animation: 'none' } : undefined}
      >
        {fullItems.map((item, index) => (
          <div key={index} className="flex items-center gap-6 shrink-0">
            <span className={`font-black uppercase tracking-tighter ${variant === 'neon' ? 'text-lg sm:text-2xl text-[#0A0C0B]' : 'text-base sm:text-xl text-[#F5F5F4]'}`}>
              {item}
            </span>
            <span className={`text-base sm:text-xl font-black ${variant === 'neon' ? 'text-[#0A0C0B]' : 'text-[#C6FF00]'}`}>
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
