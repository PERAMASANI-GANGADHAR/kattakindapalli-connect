import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-full px-1 py-1">
      <button
        onClick={() => i18n.changeLanguage('te')}
        className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition cursor-pointer ${
          i18n.language === 'te' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:bg-white/60'
        }`}
      >
        తెలుగు
      </button>
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition cursor-pointer ${
          i18n.language === 'en' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:bg-white/60'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;