import React from 'react';
import defaultLogoImg from '../assets/images/regenerated_image_1787517696306.png';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  imageSrc?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  imageSrc = defaultLogoImg
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }[size];

  const textClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Cherub with Assault Rifle Silhouette Emblem */}
      <div
        className={`${iconDimensions} rounded-xl bg-black border border-white/20 p-0.5 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(198,255,0,0.15)] group-hover:border-[#C6FF00] group-hover:shadow-[0_0_20px_rgba(198,255,0,0.3)] transition-all`}
      >
        <img
          src={imageSrc}
          alt="BOSSTYCOON Emblem"
          className="w-full h-full object-contain filter contrast-125"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className={`font-black tracking-tighter text-[#F5F5F4] ${textClasses}`}>
          BOSSTYCOON<span className="text-[#C6FF00]">.</span>
        </div>
      )}
    </div>
  );
};

