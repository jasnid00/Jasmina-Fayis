import React, { useState } from 'react';
import { WeddingConfig } from '../types/wedding';
import { FloralMonogram } from './FloralMonogram';
import { Mail, Heart } from 'lucide-react';
import burgundyRosesCorner from '../assets/burgundy_corner_roses.jpg';

interface EnvelopeCoverProps {
  config: WeddingConfig;
  isOpen: boolean;
  onOpen: () => void;
  guestName?: string;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  config,
  isOpen,
  onOpen,
  guestName,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  if (isOpen) return null;

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-[#faf7f2] transition-all duration-1000 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="absolute inset-0 bg-parchment" />

      {/* Botanical Corner Floral Art */}
      <div className="absolute -top-6 -left-6 w-52 sm:w-80 md:w-96 pointer-events-none z-10 opacity-95 transition-transform duration-700">
        <img
          src={burgundyRosesCorner}
          alt="Burgundy Roses Botanical Corner"
          className="w-full h-auto object-contain filter drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="absolute -bottom-10 -right-10 w-44 sm:w-72 md:w-84 pointer-events-none z-10 opacity-80 rotate-180 transition-transform duration-700">
        <img
          src={burgundyRosesCorner}
          alt="Burgundy Roses Botanical Corner"
          className="w-full h-auto object-contain filter drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Royal Invitation Card */}
      <div className="relative w-full max-w-xl bg-[#fffefc] rounded-2xl shadow-2xl border border-[#dec177]/60 p-6 sm:p-10 text-center z-20 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-2 sm:inset-3 rounded-xl border border-[#dec177]/40 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 rounded-lg border border-[#b38b39]/20 pointer-events-none" />

        {guestName && (
          <div className="mb-3 px-3 py-1 bg-[#fcf1f3] border border-[#dec177]/40 rounded-full text-[11px] sm:text-xs font-serif tracking-widest text-[#6b1024]">
            HONOURED GUEST: <span className="font-semibold">{guestName}</span>
          </div>
        )}

        {/* Monogram Crest */}
        <div className="my-2 sm:my-3 flex items-center justify-center">
          <FloralMonogram size="lg" />
        </div>

        {/* Islamic Blessing */}
        <div className="mt-2 space-y-1">
          <p
            dir="rtl"
            className="text-base sm:text-lg font-serif text-[#6b1024] leading-relaxed tracking-wide"
            style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
          >
            {config.ISLAMIC_BLESSING_ARABIC}
          </p>
          <p className="text-[12px] sm:text-xs text-[#8a641f] italic max-w-md mx-auto font-serif">
            "{config.ISLAMIC_BLESSING_ENGLISH}"
          </p>
        </div>

        {/* Golden Diamond Divider */}
        <div className="flex items-center justify-center gap-3 w-40 my-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#cbaa55]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#b38b39]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#cbaa55]" />
        </div>

        <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#99752b] font-medium">
          The Nikkah & Wedding Celebration of
        </p>

        {/* Couple Heading */}
        <div className="my-2 space-y-0.5">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-[#520b1a] tracking-normal leading-tight font-normal"
            style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
          >
            Jasmina & Fayis
          </h1>
          <p className="text-xs sm:text-sm font-serif text-[#84162e] tracking-wide mt-1">
            {config.BRIDE_NAME} & {config.GROOM_NAME}
          </p>
        </div>

        <div className="mt-2 text-xs sm:text-sm font-serif tracking-[0.25em] text-[#6b1024] font-semibold">
          {config.COVER_DATE || '14.11.2026'}
        </div>

        <p className="text-[11px] sm:text-xs text-[#7d6849] mt-0.5 font-serif">
          {config.NIKAH_VENUE}, {config.VENUE_LOCATION}
        </p>

        {/* Action Button */}
        <div className="mt-6 sm:mt-8 pt-2">
          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full gold-shimmer-btn text-[#fdfcf9] font-serif text-sm tracking-[0.18em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute -left-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000 ease-out" />
            </span>
            <Mail className="w-4 h-4 text-[#dec177] animate-pulse" />
            <span className="font-medium">Tap to Open</span>
            <Heart className="w-3.5 h-3.5 text-[#dec177] fill-[#dec177]/40" />
          </button>

          <p className="text-[10px] sm:text-[11px] text-[#99752b] tracking-wider uppercase mt-2.5 opacity-80">
            Click to unveil the invitation & music
          </p>
        </div>
      </div>
    </div>
  );
};
