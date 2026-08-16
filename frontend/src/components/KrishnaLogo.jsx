import React, { useState, useEffect } from 'react';

const KrishnaSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="8" rx="4.5" ry="6" fill="currentColor" opacity="0.9" />
    <circle cx="32" cy="8" r="1.8" fill="#0B4D3C" />
    <path d="M32 13 L32 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="32" cy="24" r="8" fill="currentColor" />
    <path
      d="M24 32 C24 29, 28 27, 32 27 C36 27, 40 29, 40 32 L42 46 C42 48, 40 50, 32 50 C24 50, 22 48, 22 46 Z"
      fill="currentColor"
    />
    <path d="M24 34 C19 33, 15 31, 11 29" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M40 34 C35 37, 28 38, 20 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    <rect x="9" y="27.5" width="26" height="3" rx="1.5" fill="currentColor" transform="rotate(-8 9 27.5)" opacity="0.85" />
    <path d="M26 50 L20 62 M38 50 L44 62" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
  </svg>
);

const rotationItems = [
  { type: 'krishna' },
  { type: 'emoji', content: '🌾' },
  { type: 'emoji', content: '🎓' },
  { type: 'emoji', content: '📚' },
];

const KrishnaLogo = ({ className = 'w-6 h-6' }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotationItems.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = rotationItems[index];

  return (
    <div
      className={`${className} flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {current.type === 'krishna' ? (
        <KrishnaSVG className="w-full h-full" />
      ) : (
        <span className="leading-none" style={{ fontSize: '80%' }}>
          {current.content}
        </span>
      )}
    </div>
  );
};

export default KrishnaLogo;
