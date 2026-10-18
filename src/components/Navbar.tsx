import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../types/wedding';
import { Eye } from 'lucide-react';

interface NavbarProps {
  config: WeddingConfig;
  onOpenRSVP: () => void;
  onOpenCover: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenRSVP,
  onOpenCover,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#dec177]/40 shadow-sm py-3'
          : 'bg-transparent py-4 border-b border-[#dec177]/20'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">
        <a
          href="#welcome"
          className="text-lg sm:text-xl font-serif font-bold tracking-wider text-[#520b1a] whitespace-nowrap shrink-0 hover:text-[#84162e] transition-colors"
        >
          {config.MONOGRAM_INITIALS || `${config.BRIDE_DISPLAY_NAME || 'Jasmina'} & ${config.GROOM_DISPLAY_NAME || 'Fayis'}`}
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-serif uppercase tracking-[0.18em] text-[#6b1024]">
          <a
            href="#welcome"
            className="hover:text-[#99752b] transition-colors whitespace-nowrap shrink-0"
          >
            Blessing
          </a>
          <a
            href="#couple"
            className="hover:text-[#99752b] transition-colors whitespace-nowrap shrink-0"
          >
            The Couple
          </a>
          <a
            href="#countdown"
            className="hover:text-[#99752b] transition-colors whitespace-nowrap shrink-0"
          >
            Countdown
          </a>
          <a
            href="#nikah-details"
            className="hover:text-[#99752b] transition-colors whitespace-nowrap shrink-0"
          >
            Nikkah & Wedding
          </a>
          <a
            href="#verse"
            className="hover:text-[#99752b] transition-colors whitespace-nowrap shrink-0"
          >
            Holy Quran
          </a>
        </nav>

        {/* Right Action Controls: Eye Icon + RSVP Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCover}
            className="p-1.5 text-[#741628] hover:text-[#9e782f] transition-colors cursor-pointer"
            title="View Opening Cover"
            aria-label="View Opening Cover"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenRSVP}
            className="px-4 py-2 text-xs font-serif font-medium uppercase tracking-widest text-[#fdfcf9] bg-[#6b1024] hover:bg-[#84162e] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            RSVP
          </button>
        </div>
      </div>
    </header>
  );
};
