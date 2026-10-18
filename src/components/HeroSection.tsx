import React from 'react';
import { WeddingConfig } from '../types/wedding';

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  return (
    <section id="welcome" className="relative py-12 sm:py-16 text-center max-w-3xl mx-auto px-4">
      {/* Top Diamond Separator */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#cbaa55]" />
        <div className="flex items-center gap-1.5 text-[#b38b39]">
          <span className="w-1.5 h-1.5 rotate-45 border border-[#b38b39]" />
          <span className="w-2.5 h-2.5 rotate-45 bg-[#b38b39]" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#b38b39]" />
        </div>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#cbaa55]" />
      </div>

      {/* Sacred Bismillah */}
      <div className="my-4">
        <h2
          dir="rtl"
          className="text-2xl sm:text-3xl md:text-4xl text-[#520b1a] tracking-wide leading-relaxed"
          style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-serif italic text-[#8a641f] tracking-wide">
          In the Name of Allah, the Most Gracious and the Most Merciful
        </p>
      </div>

      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#cbaa55] to-transparent mx-auto my-6" />

      {/* Invitation Heading */}
      <div className="space-y-3">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#99752b] font-medium block">
          Sacred Union & Celebration
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#3f0712] font-normal tracking-wide">
          You Are Cordially Invited
        </h3>
      </div>

      {/* Invitation Card */}
      <div className="mt-6 max-w-2xl mx-auto bg-[#faf7f2]/70 p-6 sm:p-8 rounded-2xl border border-[#dec177]/40 shadow-sm relative">
        <p className="font-serif text-sm sm:text-base leading-relaxed text-[#4a0d18] italic">
          "{config.INVITATION_MESSAGE}"
        </p>
        <div className="mt-4 flex items-center justify-center text-[#cbaa55]">
          <span className="text-xs">✦ &nbsp; ✦ &nbsp; ✦</span>
        </div>
      </div>
    </section>
  );
};
