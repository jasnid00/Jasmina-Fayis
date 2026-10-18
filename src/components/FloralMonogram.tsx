import React, { useState } from 'react';
import goldCrestImg from '../assets/gold_floral_crest_circle.png';

interface FloralMonogramProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FloralMonogram: React.FC<FloralMonogramProps> = ({
  className = '',
  size = 'lg',
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses: Record<string, string> = {
    sm: 'w-14 h-14 sm:w-16 sm:h-16',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.lg;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${selectedSize} ${className}`}
      aria-label="Jasmina & Fayis Floral Monogram"
    >
      <div className="relative w-full h-full rounded-full flex items-center justify-center drop-shadow-sm">
        {!hasError ? (
          <img
            src={goldCrestImg}
            alt="Jasmina & Fayis Floral Monogram Logo"
            className="w-full h-full object-contain select-none"
            onError={() => setHasError(true)}
          />
        ) : (
          <svg viewBox="0 0 200 200" className="w-full h-full p-1" aria-hidden="true">
            <defs>
              <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7e7c4" />
                <stop offset="40%" stopColor="#d4af37" />
                <stop offset="80%" stopColor="#aa7c11" />
              </linearGradient>
              <linearGradient id="burgundyG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a0815" />
                <stop offset="100%" stopColor="#7a1428" />
              </linearGradient>
            </defs>
            {/* Outer Floral Wreath Rings */}
            <circle cx="100" cy="100" r="92" fill="#fffdfa" stroke="url(#goldG)" strokeWidth="2" />
            <circle cx="100" cy="100" r="86" fill="none" stroke="url(#goldG)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="76" fill="none" stroke="url(#goldG)" strokeWidth="1.5" />
            {/* Botanical Leaf Accents */}
            <path d="M100 8 C105 18, 110 24, 100 32 C90 24, 95 18, 100 8 Z" fill="url(#goldG)" />
            <path d="M100 192 C105 182, 110 176, 100 168 C90 176, 95 182, 100 192 Z" fill="url(#goldG)" />
            <path d="M8 100 C18 105, 24 110, 32 100 C24 90, 18 95, 8 100 Z" fill="url(#goldG)" />
            <path d="M192 100 C182 105, 176 110, 168 100 C176 90, 182 95, 192 100 Z" fill="url(#goldG)" />
            <text
              x="100"
              y="114"
              textAnchor="middle"
              fill="url(#burgundyG)"
              fontFamily="'Cinzel', serif"
              fontSize="40"
              fontWeight="700"
              letterSpacing="2"
            >
              J & F
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};
