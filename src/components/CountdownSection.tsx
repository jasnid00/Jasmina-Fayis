import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../types/wedding';
import { Heart } from 'lucide-react';

interface CountdownSectionProps {
  config: WeddingConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const calculateTimeLeft = (): TimeLeft => {
    try {
      const targetDate = new Date(`${config.NIKAH_DATE || '2026-11-14'}T${config.NIKAH_TIME || '10:00'}:00${config.TIMEZONE_OFFSET || '+05:30'}`).getTime();
      const diff = targetDate - Date.now();
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
      }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isPast: false,
      };
    } catch {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [config.NIKAH_DATE, config.NIKAH_TIME, config.TIMEZONE_OFFSET]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 text-center">
      <div className="space-y-2 mb-8">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#99752b] font-medium block">
          Until We Say "Qubool Hai"
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-[#3f0712] font-normal tracking-wide">
          Counting Down to Our Blessed Day
        </h3>
        <p className="text-xs sm:text-sm font-serif italic text-[#84162e]">
          Every second brings us closer to this cherished union
        </p>
      </div>

      {timeLeft.isPast ? (
        <div className="bg-[#fcf0f2] border border-[#dec177] rounded-2xl p-8 max-w-lg mx-auto shadow-md">
          <Heart className="w-8 h-8 text-[#84162e] mx-auto mb-3 fill-[#84162e]/20" />
          <h4 className="text-2xl font-serif text-[#520b1a] mb-2 font-normal">
            Alhamdulillah! The Blessed Day Is Here
          </h4>
          <p className="text-sm font-serif text-[#741628] leading-relaxed">
            Celebrating the sacred Nikkah & Wedding of {config.BRIDE_NAME} & {config.GROOM_NAME}. May Allah bless their journey together with barakah and perpetual love.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="group relative bg-[#fcf0f2] border border-[#dec177]/60 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#dec177] via-[#cbaa55] to-[#dec177]" />
              <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#520b1a] tabular-nums tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-serif text-[#99752b] font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
