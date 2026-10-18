import React, { useState } from 'react';
import { WeddingConfig } from '../types/wedding';
import { FloralMonogram } from './FloralMonogram';
import { ArrowUp, Share2, Check } from 'lucide-react';

interface FooterProps {
  config: WeddingConfig;
  onOpenCover?: () => void;
  onOpenRSVP?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 text-center max-w-4xl mx-auto px-4 border-t border-[#dec177]/40 mt-12 font-serif">
      <div className="flex justify-center mb-4">
        <FloralMonogram size="sm" />
      </div>

      <div className="space-y-3 max-w-xl mx-auto">
        <h4
          className="text-3xl sm:text-4xl text-[#520b1a] font-normal"
          style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
        >
          Jasmina & Fayis
        </h4>
        <p className="font-serif italic text-sm sm:text-base text-[#6b1024] leading-relaxed">
          "{config.THANK_YOU_MESSAGE}"
        </p>
      </div>

      <p className="mt-4 text-xs font-serif text-[#9e782f] tracking-wide">
        جَزَاكَ اللّٰهُ خَيْرًا · Jazakallahu Khairan
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <button
          onClick={handleShareClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#dec177]/60 text-xs font-serif text-[#520b1a] hover:bg-[#faf7f2] transition-colors shadow-xs cursor-pointer"
          title="Share invitation link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#9e782f]" />
              <span>Share Invitation Link</span>
            </>
          )}
        </button>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6b1024] text-white hover:bg-[#84162e] text-xs font-serif transition-colors shadow-xs cursor-pointer"
          title="Scroll back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>

      <div className="mt-10 text-[11px] text-[#99752b]/70 font-serif">
        The Blessed Nikkah & Wedding Ceremony · With Sincerity & Prayers
      </div>
    </footer>
  );
};
