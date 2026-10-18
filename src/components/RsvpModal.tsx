import React, { useState } from 'react';
import { WeddingConfig } from '../types/wedding';
import { X, Check, Copy, Heart, Sparkles } from 'lucide-react';

interface RsvpModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
  defaultGuestName?: string;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  config,
  isOpen,
  onClose,
  defaultGuestName = '',
}) => {
  const [guestName, setGuestName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<'attending' | 'declining'>('attending');
  const [guestCount, setGuestCount] = useState('2');
  const [wishes, setWishes] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const generateRsvpText = () => {
    const statusText =
      attendance === 'attending' ? 'Delightfully attending' : 'Regretfully unable to attend';
    const countText = attendance === 'attending' ? `\nGuests Attending: ${guestCount}` : '';
    const duaText = wishes.trim() ? `\nSpecial Dua / Wishes: "${wishes.trim()}"` : '';

    return (
      `RSVP for the Nikkah & Wedding of ${config.BRIDE_NAME} & ${config.GROOM_NAME}\n\n` +
      `Guest Name: ${guestName || 'Guest'}\n` +
      `Status: ${statusText}${countText}${duaText}\n\n` +
      `Date: ${config.NIKAH_DATE_DISPLAY || 'Saturday, 14 November 2026'}\n` +
      `Venue: ${config.NIKAH_VENUE}, ${config.VENUE_LOCATION}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateRsvpText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#fffefc] border border-[#dec177] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden font-serif"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-2 rounded-2xl border border-[#dec177]/30 pointer-events-none" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#741628] hover:text-[#520b1a] hover:bg-[#fcf0f2] rounded-full transition-colors cursor-pointer"
          aria-label="Close RSVP modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4 font-serif">
            <div className="w-14 h-14 rounded-full bg-[#fcf0f2] border border-[#dec177] flex items-center justify-center mx-auto text-[#84162e]">
              <Check className="w-8 h-8 text-[#84162e]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl text-[#520b1a] font-normal">
                Jazakumullahu Khairan!
              </h3>
              <p className="text-sm text-[#741628] leading-relaxed max-w-sm mx-auto">
                Thank you, <strong className="font-semibold text-[#3f0712]">{guestName || 'Guest'}</strong>! Your RSVP response has been recorded.
              </p>
              <p className="text-xs text-[#99752b] italic">
                {attendance === 'attending'
                  ? `We look forward to celebrating with you and your family on ${
                      config.NIKAH_DATE_DISPLAY || 'Saturday, 14 November 2026'
                    }!`
                  : 'Thank you for letting us know. Your prayers and blessings are cherished!'}
              </p>
            </div>

            <div className="pt-3 space-y-2 max-w-xs mx-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2 px-4 rounded-full bg-[#faf7f2] hover:bg-white text-[#741628] border border-[#cbaa55]/40 text-xs font-serif tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Copied Confirmation!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#9e782f]" />
                    <span>Copy Confirmation</span>
                  </>
                )}
              </button>

              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-full gold-shimmer-btn text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-1 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#fcf0f2] border border-[#dec177] flex items-center justify-center mx-auto text-[#84162e] mb-2">
                <Heart className="w-5 h-5 fill-[#84162e]/20" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#99752b] font-medium">
                Join Our Celebration
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#3f0712] font-normal">
                RSVP for the Nikkah & Wedding
              </h3>
              <p className="text-xs font-serif italic text-[#741628]">
                Kindly respond for {config.NIKAH_DATE_DISPLAY || 'Saturday, 14 November 2026'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-serif relative z-10">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g., Brother Tariq & Family"
                  className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#dec177]/60 rounded-xl text-sm text-[#3f0712] focus:outline-none focus:ring-1 focus:ring-[#9e1f3a] focus:border-[#9e1f3a]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
                  Will you be attending?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-2 px-3 text-xs uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      attendance === 'attending'
                        ? 'bg-[#6b1024] text-white border-[#6b1024] font-semibold shadow-sm'
                        : 'bg-[#faf7f2] text-[#6b1024] border-[#dec177]/60 hover:bg-white'
                    }`}
                  >
                    Joyfully Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('declining')}
                    className={`py-2 px-3 text-xs uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      attendance === 'declining'
                        ? 'bg-[#6b1024] text-white border-[#6b1024] font-semibold shadow-sm'
                        : 'bg-[#faf7f2] text-[#6b1024] border-[#dec177]/60 hover:bg-white'
                    }`}
                  >
                    Regretfully Declining
                  </button>
                </div>
              </div>

              {attendance === 'attending' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#dec177]/60 rounded-xl text-sm text-[#3f0712] focus:outline-none focus:ring-1 focus:ring-[#9e1f3a]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="5+">5+ Family Members</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
                  Dua / Warm Wishes for Couple (Optional)
                </label>
                <textarea
                  rows={2}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Barakallahu feekum, wishing you a lifetime of peace and barakah..."
                  className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#dec177]/60 rounded-xl text-sm text-[#3f0712] focus:outline-none focus:ring-1 focus:ring-[#9e1f3a]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-full gold-shimmer-btn text-[#fdfcf9] font-serif text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-md hover:scale-101 active:scale-99 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 text-[#dec177]" />
                  <span>Confirm RSVP</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-2 px-4 rounded-full bg-[#faf7f2] hover:bg-white text-[#741628] border border-[#cbaa55]/40 text-xs font-serif tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#9e782f]" />
                      <span>Copy RSVP Details</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
