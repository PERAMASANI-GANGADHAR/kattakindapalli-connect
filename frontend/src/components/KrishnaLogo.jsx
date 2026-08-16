import React from 'react';
import krishnaImg from '../assets/krishna-logo.jpg';

const KrishnaLogo = ({ className = 'w-6 h-6' }) => {
  return (
    <div className={`${className} rounded-full overflow-hidden border-2 border-emerald-600 shrink-0`}>
      <img
        src={krishnaImg}
        alt="Krishna"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default KrishnaLogo;
