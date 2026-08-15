import React from 'react';

const KrishnaLogo = ({ className = 'w-6 h-6' }) => {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Peacock feather crown */}
      <ellipse cx="32" cy="8" rx="4.5" ry="6" fill="currentColor" opacity="0.9" />
      <circle cx="32" cy="8" r="1.8" fill="#0B4D3C" />
      <path d="M32 13 L32 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Head */}
      <circle cx="32" cy="24" r="8" fill="currentColor" />

      {/* Neck & shoulders */}
      <path
        d="M24 32 C24 29, 28 27, 32 27 C36 27, 40 29, 40 32 L42 46 C42 48, 40 50, 32 50 C24 50, 22 48, 22 46 Z"
        fill="currentColor"
      />

      {/* Left arm holding flute (up) */}
      <path
        d="M24 34 C19 33, 15 31, 11 29"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right arm holding flute (down, crossed pose) */}
      <path
        d="M40 34 C35 37, 28 38, 20 36"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Flute */}
      <rect x="9" y="27.5" width="26" height="3" rx="1.5" fill="currentColor" transform="rotate(-8 9 27.5)" opacity="0.85" />

      {/* Dhoti hint */}
      <path d="M26 50 L20 62 M38 50 L44 62" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
};

export default KrishnaLogo;