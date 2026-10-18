import React, { useState, useEffect } from 'react';
import { weddingConfig } from './config/weddingData';
import { EnvelopeCover } from './components/EnvelopeCover';
import { RosePetals } from './components/RosePetals';
import { AudioPlayer } from './components/AudioPlayer';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { CeremonyDetails } from './components/CeremonyDetails';
import { QuranVerseSection } from './components/QuranVerseSection';
import { RsvpModal } from './components/RsvpModal';
import { Footer } from './components/Footer';

import burgundyCornerRoses from './assets/burgundy_corner_roses.jpg';
import burgundyWeddingFlorals from './assets/burgundy_wedding_florals.jpg';

export default function App() {
  const [config] = useState(weddingConfig);
  const [isCoverOpen, setIsCoverOpen] = useState(false); // false means cover is displayed on initial arrival
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [guestName, setGuestName] = useState<string | undefined>(undefined);

  // Check URL query parameters for personalised guest invite
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const name = searchParams.get('guest') || searchParams.get('to') || searchParams.get('invite');
      if (name) {
        setGuestName(decodeURIComponent(name.replace(/\+/g, ' ')));
      }
    } catch (err) {
      console.error('Error parsing guest parameters:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-parchment text-[#3f0712] relative selection:bg-[#741628] selection:text-[#fdfcf9] overflow-x-hidden">
      {/* Opening Envelope Cover */}
      <EnvelopeCover
        config={config}
        isOpen={isCoverOpen}
        onOpen={() => {
          setIsCoverOpen(true);
        }}
        guestName={guestName}
      />

      {/* Falling Rose Petals Canvas Atmosphere */}
      <RosePetals enabled={true} />

      {/* Floating Background Music Button with Auto-play & Continuous Looping */}
      <AudioPlayer
        youtubeVideoId={config.YOUTUBE_ID || 'Qo175VaAl78'}
        unmuteTrigger={isCoverOpen}
      />

      {/* Decorative Fixed Side Floral Artwork */}
      <div className="fixed -top-10 -left-10 w-48 sm:w-72 md:w-88 pointer-events-none z-10 opacity-90 transition-opacity duration-500">
        <img
          src={burgundyCornerRoses}
          alt="Burgundy Roses Floral Frame"
          className="w-full h-auto object-contain filter drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="fixed -bottom-16 -left-12 w-44 sm:w-64 md:w-80 pointer-events-none z-10 opacity-70 transition-opacity duration-500">
        <img
          src={burgundyWeddingFlorals}
          alt="Jasmina & Fayis Wedding Floral Invitation Card"
          className="w-full h-auto object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Navigation Bar */}
      <Navbar
        config={config}
        onOpenRSVP={() => setIsRsvpOpen(true)}
        onOpenCover={() => setIsCoverOpen(false)}
      />

      {/* Main Page Content */}
      <main className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {guestName && (
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1.5 bg-[#fcf0f2] border border-[#dec177]/60 rounded-full text-xs font-serif tracking-widest text-[#6b1024] shadow-xs">
              Honoured Guest: <strong className="font-semibold">{guestName}</strong>
            </span>
          </div>
        )}

        {/* 1. Blessing Section */}
        <HeroSection config={config} />

        {/* Section Divider */}
        <div className="flex items-center justify-center gap-3 w-48 mx-auto my-6 opacity-70">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#cbaa55]" />
          <span className="text-xs text-[#b38b39]">❦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#cbaa55]" />
        </div>

        {/* 2. The Couple Section */}
        <CoupleSection config={config} />

        {/* 3. Countdown Section */}
        <CountdownSection config={config} />

        {/* 4. Nikkah & Wedding Venue Section */}
        <CeremonyDetails config={config} />

        {/* 5. Holy Quran Section */}
        <QuranVerseSection config={config} />

        {/* 6. RSVP Section on Page */}
        <section className="py-10 text-center max-w-3xl mx-auto">
          <div className="bg-[#fffefc] border border-[#dec177]/80 rounded-2xl p-8 shadow-md">
            <h4 className="text-2xl font-serif text-[#520b1a] mb-2 font-normal">
              Kindly Favour Us With Your RSVP
            </h4>
            <p className="text-sm font-serif italic text-[#6b1024] mb-6 max-w-lg mx-auto">
              Please let us know if you can join our celebration and grace us with your presence and prayers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsRsvpOpen(true)}
                className="px-8 py-3 rounded-full gold-shimmer-btn text-white font-serif text-xs uppercase tracking-[0.2em] font-medium shadow-md hover:scale-103 active:scale-98 transition-all cursor-pointer"
              >
                RSVP Online
              </button>
            </div>
          </div>
        </section>

        {/* 7. Footer */}
        <Footer
          config={config}
          onOpenCover={() => setIsCoverOpen(false)}
          onOpenRSVP={() => setIsRsvpOpen(true)}
        />
      </main>

      {/* RSVP Modal */}
      <RsvpModal
        config={config}
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        defaultGuestName={guestName}
      />
    </div>
  );
}
