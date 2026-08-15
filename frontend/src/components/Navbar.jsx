import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import KrishnaLogo from './KrishnaLogo';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3">
          <KrishnaLogo className="w-8 h-8" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-900 text-lg tracking-tight">Kattakindapalli</span>
              <span className="font-black text-emerald-600 text-lg tracking-tight">Connect</span>
            </div>
            <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase -mt-1">
              Gram Panchayat Portal
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/" className={`transition-colors ${isActive('/') ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600'}`}>
            {t('nav.home')}
          </Link>
          <Link to="/farmer" className={`transition-colors ${isActive('/farmer') ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600'}`}>
            {t('nav.farmer')}
          </Link>
          <Link to="/student" className={`transition-colors ${isActive('/student') ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600'}`}>
            {t('nav.student')}
          </Link>
          <Link to="/library" className={`transition-colors ${isActive('/library') ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600'}`}>
            {t('nav.library')}
          </Link>
          <Link to="/schemes" className={`transition-colors ${isActive('/schemes') ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600'}`}>
            {t('nav.schemes')}
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Navbar;