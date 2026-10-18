import React from 'react';
import { WeddingConfig } from '../types/wedding';
import { Heart } from 'lucide-react';

interface QuranVerseSectionProps {
  config: WeddingConfig;
}

export const QuranVerseSection: React.FC<QuranVerseSectionProps> = ({ config }) => {
  return (
    <section id="verse" className="py-14 sm:py-20 max-w-4xl mx-auto px-4 text-center">
      <div className="relative bg-[#fffefc] border border-[#dec177]/70 rounded-3xl p-8 sm:p-14 shadow-lg overflow-hidden">
        {/* Corner Filigree Borders */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#dec177]/60 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#dec177]/60 rounded-br-3xl pointer-events-none" />

        {/* Heart Wreath */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#cbaa55]" />
          <div className="w-8 h-8 rounded-full bg-[#fcf0f2] border border-[#dec177] flex items-center justify-center text-[#84162e]">
            <Heart className="w-4 h-4 text-[#84162e]" />
          </div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#cbaa55]" />
        </div>

        <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#99752b] font-medium mb-5">
          {config.QURAN_SURAH}
        </p>

        {/* Arabic Calligraphy */}
        <div className="my-6 max-w-2xl mx-auto">
          <p
            dir="rtl"
            className="text-xl sm:text-2xl md:text-3xl text-[#520b1a] leading-[2.2] tracking-wide font-normal"
            style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
          >
            {config.QURAN_ARABIC}
          </p>
        </div>

        {/* Diamond Separator */}
        <div className="flex items-center justify-center gap-2 my-6 text-[#dec177]">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#b38b39]" />
          <span className="w-12 h-[1px] bg-[#dec177]" />
          <span className="w-2 h-2 rotate-45 border border-[#b38b39]" />
          <span className="w-12 h-[1px] bg-[#dec177]" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#b38b39]" />
        </div>

        {/* Translation */}
        <p className="text-sm sm:text-base font-serif italic text-[#6b1024] max-w-2xl mx-auto leading-relaxed">
          "{config.QURAN_TRANSLATION}"
        </p>

        <p className="text-[11px] sm:text-xs text-[#9e782f] uppercase tracking-widest mt-4 font-serif">
          The Holy Qur'an · Chapter 30, Verse 21
        </p>
      </div>
    </section>
  );
};
