import React from 'react';
import { WeddingConfig } from '../types/wedding';
import { generateGoogleCalendarUrl } from '../config/weddingData';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import burgundyWeddingFlorals from '../assets/burgundy_wedding_florals.jpg';

interface CeremonyDetailsProps {
  config: WeddingConfig;
}

export const CeremonyDetails: React.FC<CeremonyDetailsProps> = ({ config }) => {
  return (
    <section id="nikah-details" className="py-12 sm:py-16 max-w-4xl mx-auto px-4">
      <div className="text-center space-y-2 mb-10">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#99752b] font-medium block">
          Ceremony & Venue
        </span>
        <h3 className="text-3xl sm:text-4xl font-serif text-[#3f0712] font-normal tracking-wide">
          {config.EVENT_TITLE || 'Nikkah & Wedding'}
        </h3>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#cbaa55] to-transparent mx-auto mt-2" />
      </div>

      <div className="relative bg-[#fffefc] border border-[#dec177]/70 rounded-2xl shadow-lg p-6 sm:p-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-36 sm:w-48 opacity-15 pointer-events-none">
          <img
            src={burgundyWeddingFlorals}
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 space-y-6 text-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#99752b] font-medium">
              In The Grace Of Almighty
            </p>
            <h4 className="text-2xl sm:text-3xl font-serif text-[#520b1a] mt-1 font-normal">
              {config.CEREMONY_TITLE || 'Nikkah & Wedding'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left bg-[#faf7f2]/60 p-5 sm:p-7 rounded-xl border border-[#dec177]/40">
            {/* Date */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#fcf0f2] border border-[#dec177]/60 flex items-center justify-center shrink-0 text-[#84162e]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#99752b] font-serif font-medium">
                  Date
                </p>
                <p className="text-sm sm:text-base font-serif font-semibold text-[#3f0712] mt-0.5">
                  {config.NIKAH_DATE_DISPLAY}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#fcf0f2] border border-[#dec177]/60 flex items-center justify-center shrink-0 text-[#84162e]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#99752b] font-serif font-medium">
                  Time
                </p>
                <p className="text-sm sm:text-base font-serif font-semibold text-[#3f0712] mt-0.5">
                  {config.NIKAH_TIME_DISPLAY || '10:00 AM'}
                </p>
              </div>
            </div>

            {/* Wedding Venue */}
            <div className="sm:col-span-2 flex items-start gap-3.5 pt-2 border-t border-[#dec177]/30">
              <div className="w-9 h-9 rounded-full bg-[#fcf0f2] border border-[#dec177]/60 flex items-center justify-center shrink-0 text-[#84162e]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#99752b] font-serif font-medium">
                  Wedding Venue
                </p>
                <p className="text-base sm:text-lg font-serif font-semibold text-[#3f0712] mt-0.5">
                  {config.NIKAH_VENUE}, {config.VENUE_LOCATION}
                </p>
                <p className="text-xs sm:text-sm font-serif text-[#741628] mt-1 leading-relaxed">
                  {config.NIKAH_ADDRESS}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={config.GOOGLE_MAPS_URL || 'https://maps.app.goo.gl/znavTsacm1uLivbdA'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6b1024] hover:bg-[#84162e] text-[#fdfcf9] font-serif text-xs uppercase tracking-widest transition-all shadow-sm cursor-pointer hover:scale-102"
              title="Open Google Maps Location in a new tab"
            >
              <MapPin className="w-3.5 h-3.5 text-[#dec177]" />
              <span>View Location</span>
              <ExternalLink className="w-3 h-3 text-[#dec177]/80" />
            </a>

            <a
              href={generateGoogleCalendarUrl(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#faf7f2] hover:bg-white text-[#520b1a] border border-[#cbaa55] font-serif text-xs uppercase tracking-widest transition-all shadow-sm cursor-pointer hover:scale-102"
            >
              <Calendar className="w-3.5 h-3.5 text-[#9e782f]" />
              <span>Google Calendar</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
