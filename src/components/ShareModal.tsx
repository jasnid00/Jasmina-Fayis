import React, { useState } from 'react';
import { WeddingConfig } from '../types/wedding';
import { X, Share2, Copy, Check, Send, Sparkles } from 'lucide-react';

interface ShareModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  config,
  isOpen,
  onClose,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const shareUrl = recipientName.trim()
    ? `${currentUrl}?guest=${encodeURIComponent(recipientName.trim())}`
    : currentUrl;

  const shareText = `*The Nikkah & Wedding Invitation of ${config.COVER_NAMES}*\n\n` +
    (recipientName.trim() ? `Dear ${recipientName.trim()},\n` : '') +
    `With hearts full of joy and gratitude, we cordially invite you and your family to celebrate the blessed occasion of our Nikkah & Wedding.\n\n` +
    `📅 Date: ${config.NIKAH_DATE_DISPLAY}\n` +
    `⏰ Time: ${config.NIKAH_TIME_DISPLAY}\n` +
    `📍 Venue: ${config.NIKAH_VENUE}, ${config.VENUE_LOCATION}\n\n` +
    `View the digital invitation & RSVP online:\n${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-serif"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#fffefc] border-2 border-[#dec177]/80 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#741628] hover:bg-[#fcf0f2] transition-colors cursor-pointer"
          aria-label="Close share modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#fcf0f2] border border-[#dec177] mx-auto flex items-center justify-center text-[#84162e] mb-3">
            <Share2 className="w-5 h-5 text-[#99752b]" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#99752b] font-medium block">
            Digital Wedding Card
          </span>
          <h3 className="text-2xl font-serif text-[#3f0712] font-normal mt-1">
            Personalised Invitation Link
          </h3>
          <p className="text-xs font-serif italic text-[#741628] mt-1">
            Generate a personalized digital invite for your guests
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
              Guest / Family Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Uncle Rasheed & Family"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#dec177]/70 rounded-xl focus:outline-none focus:border-[#99752b] text-[#3f0712]"
            />
          </div>

          <div className="p-3 bg-[#faf7f2] border border-[#dec177]/50 rounded-xl text-xs text-[#520b1a] break-all select-all font-mono">
            {shareUrl}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3 rounded-full gold-shimmer-btn text-white text-xs uppercase tracking-wider font-medium shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#dec177]" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-full bg-[#faf7f2] border border-[#dec177] hover:bg-[#fcf0f2] text-[#6b1024] text-xs font-serif flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#99752b]" />
                  <span>Copy Personalized Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
