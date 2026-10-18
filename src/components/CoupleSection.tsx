import React from 'react';
import { WeddingConfig } from '../types/wedding';
import { FloralMonogram } from './FloralMonogram';
import { Calendar } from 'lucide-react';

interface CoupleSectionProps {
  config: WeddingConfig;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config }) => {
  return (
    <section id="couple" className="relative py-12 sm:py-16 max-w-4xl mx-auto px-4 text-center">
      <div className="flex justify-center mb-4">
        <FloralMonogram size="md" />
      </div>

      <div className="space-y-1 mb-8">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#99752b] font-medium">
          Together with their beloved families
        </p>
        <p className="text-xs sm:text-sm font-serif italic text-[#741628]">
          Request the honour of your presence at the Nikkah & Wedding of
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-6 my-6">
        {/* Bride Card */}
        <div className="md:col-span-5 bg-[#fffefc] border border-[#dec177]/40 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#b38b39] font-medium block mb-2">
            The Bride
          </span>
          <h3
            className="text-4xl sm:text-5xl text-[#520b1a] font-normal leading-tight"
            style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
          >
            {config.BRIDE_NAME}
          </h3>
          <div className="w-16 h-[1px] bg-[#dec177]/60 mx-auto my-3" />
          <p className="text-xs font-serif text-[#6b1024]/80 tracking-wide uppercase">
            Daughter of
          </p>
          <p className="text-sm sm:text-base font-serif font-medium text-[#3f0712] mt-1">
            {config.BRIDE_PARENTS}
          </p>
          {config.BRIDE_ADDRESS && (
            <p className="text-xs font-serif text-[#99752b] mt-1 italic tracking-wide">
              {config.BRIDE_ADDRESS}
            </p>
          )}
        </div>

        {/* Center & */}
        <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
          <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-transparent to-[#cbaa55]" />
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fdfaf5] border border-[#cbaa55] flex items-center justify-center shadow-sm my-1">
            <span
              className="text-2xl sm:text-3xl font-serif italic text-[#84162e] font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              &
            </span>
          </div>
          <div className="hidden md:block w-[1px] h-10 bg-gradient-to-t from-transparent to-[#cbaa55]" />
        </div>

        {/* Groom Card */}
        <div className="md:col-span-5 bg-[#fffefc] border border-[#dec177]/40 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#b38b39] font-medium block mb-2">
            The Groom
          </span>
          <h3
            className="text-4xl sm:text-5xl text-[#520b1a] font-normal leading-tight"
            style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
          >
            {config.GROOM_NAME}
          </h3>
          <div className="w-16 h-[1px] bg-[#dec177]/60 mx-auto my-3" />
          <p className="text-xs font-serif text-[#6b1024]/80 tracking-wide uppercase">
            Son of
          </p>
          <p className="text-sm sm:text-base font-serif font-medium text-[#3f0712] mt-1">
            {config.GROOM_PARENTS}
          </p>
          {config.GROOM_ADDRESS && (
            <p className="text-xs font-serif text-[#99752b] mt-1 italic tracking-wide">
              {config.GROOM_ADDRESS}
            </p>
          )}
        </div>
      </div>

      {/* Date & Time Banner */}
      <div className="mt-8 pt-4">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#fcf0f2] border border-[#dec177]/50 shadow-sm">
          <Calendar className="w-4 h-4 text-[#84162e]" />
          <span className="text-sm sm:text-base font-serif font-semibold tracking-wider text-[#520b1a]">
            {config.NIKAH_DATE_DISPLAY}
          </span>
          <span className="text-xs text-[#99752b] font-serif">·</span>
          <span className="text-xs sm:text-sm font-serif text-[#741628]">
            {config.NIKAH_TIME_DISPLAY || config.NIKAH_TIME}
          </span>
        </div>
      </div>
    </section>
  );
};
