import React from 'react';
import { TrendingUp, Users, CheckCircle, Award } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    { number: '835', label: 'Projects Completed', icon: TrendingUp },
    { number: '95%', label: 'Client Satisfaction', icon: Users },
    { number: '17', label: 'Team Members', icon: CheckCircle },
    { number: '16+', label: 'Years Combined Team Experience', icon: Award },
  ];

  return (
    <section className="bg-[#0A0C0B] py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
      {/* Subtle ambient glow behind metrics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#C6FF00]/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-5 sm:p-6 rounded-3xl bg-[#141716] border border-white/10 transition-all duration-300 hover:border-[#C6FF00]/40 group shadow-lg"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C6FF00] group-hover:bg-[#C6FF00]/10 transition-colors">
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-[#C6FF00] text-lg font-black">✦</span>
                </div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight group-hover:text-[#C6FF00] transition-colors mb-1">
                  {stat.number}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 leading-snug">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
