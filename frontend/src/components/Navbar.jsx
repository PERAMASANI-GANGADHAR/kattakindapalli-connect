import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import KrishnaLogo from './KrishnaLogo';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/farmer', label: t('nav.farmer') },
    { path: '/student', label: t('nav.student') },
    { path: '/library', label: t('nav.library') },
    { path: '/schemes', label: t('nav.schemes') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <KrishnaLogo className="w-10 h-10 text-emerald-700" />
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${isActive(link.path) ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* Hamburger button - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 cursor-pointer"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-slate-800 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-slate-800 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-slate-800 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`py-1 ${isActive(link.path) ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
