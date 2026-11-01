import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#C6FF00] text-[#0A0C0B] px-4 sm:px-8 py-2 border-b border-[#0A0C0B] text-[11px] font-extrabold tracking-widest uppercase">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
        {/* Editorial Eyebrow Tag */}
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#0A0C0B]" />
          <span>DIGITAL MARKETING AGENCY</span>
          <span className="hidden lg:inline-block opacity-40">•</span>
          <span className="hidden lg:inline-block font-semibold opacity-80">ESCONDIDO, CALIFORNIA</span>
        </div>

        {/* Quick Contact & Info */}
        <div className="flex items-center gap-6 text-[11px]">
          <a
            href="tel:+17608237778"
            className="flex items-center gap-1.5 hover:underline transition-all"
          >
            <Phone className="w-3 h-3 stroke-[2.5]" />
            <span>(760) 823-7778</span>
          </a>

          <a
            href="mailto:contact@bosstycoonmarketing.com"
            className="hidden sm:flex items-center gap-1.5 hover:underline transition-all"
          >
            <Mail className="w-3 h-3 stroke-[2.5]" />
            <span>contact@bosstycoonmarketing.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

