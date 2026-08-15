import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import heroBg from '../assets/hero-bg.jpg';
import KrishnaLogo from './KrishnaLogo';

const LAT = 14.9667;
const LON = 77.5833;

const Hero = () => {
  const [weather, setWeather] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current))
      .catch((err) => console.error('Weather fetch failed:', err));
  }, []);

  const getConditionText = (code) => {
    if (code === 0) return 'Clear & Sunny';
    if (code === 1 || code === 2) return 'Partly Cloudy';
    if (code === 3) return 'Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 80 && code <= 82) return 'Showers';
    if (code >= 95) return 'Stormy';
    return 'Clear';
  };

  return (
    <section className="relative w-full min-h-[560px] flex items-center overflow-hidden border-b-4 border-[#0B4D3C]">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Kattakindapalli Village"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B4D3C]/95 via-[#0B4D3C]/70 to-[#0B4D3C]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* Left Side Content */}
        <div className="lg:col-span-7 space-y-7 text-white">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1F2A24]/70 border border-[#D9A441]/50 backdrop-blur-md text-[#D9A441] text-xs font-bold tracking-[0.15em] uppercase shadow-md font-['Inter']">
            <KrishnaLogo className="w-5 h-5" />
            <span>{t('home.badge')}</span>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="font-['Fraunces'] text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-lg leading-[0.95]">
              Kattakindapalli <span className="text-[#D9A441]">Connect</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#D9A441]" />
              <p className="text-lg md:text-2xl font-['Fraunces'] italic font-medium text-[#D9A441] tracking-wide drop-shadow">
                {t('home.tagline')}
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-[#FBF6EA]/85 max-w-lg leading-relaxed font-['Inter'] font-normal">
            {t('home.desc')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2 font-['Inter']">
            <a
              href="/report-problem"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm text-[#FBF6EA] bg-[#A8503A] hover:bg-[#8f4230] shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5"
            >
              <span>📢 {t('home.reportBtn')}</span>
              <span>→</span>
            </a>

            <a
              href="/track"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm text-[#1F2A24] bg-[#FBF6EA] hover:bg-white border border-white/30 backdrop-blur-md shadow-md transition-all hover:-translate-y-0.5"
            >
              🔍 {t('home.checkBtn')}
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex items-center gap-6 pt-4 text-[#FBF6EA]/70 text-xs font-['Inter'] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{t('home.active')}</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span>{t('home.location')}</span>
          </div>
        </div>

        {/* Right Side - Weather Card */}
        <div className="lg:col-span-5 flex justify-start lg:justify-end">
          <div className="relative w-full max-w-xs">

            <div className="relative bg-[#FBF6EA] rounded-t-[3rem] rounded-b-xl overflow-hidden shadow-2xl border-4 border-[#0B4D3C]">

              {/* Green painted band */}
              <div className="bg-[#0B4D3C] pt-7 pb-4 px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <KrishnaLogo className="w-5 h-5 text-[#D9A441]" />
                  <span className="text-[#D9A441] font-['Inter'] text-[10px] font-bold uppercase tracking-[0.2em]">
                    {t('home.officialPortal')}
                  </span>
                </div>
                <p className="text-[#FBF6EA] font-['Fraunces'] text-lg font-bold">
                  Kattakindapalli
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="text-center border-b border-[#0B4D3C]/15 pb-4">
                  <div className="font-['IBM_Plex_Mono'] text-5xl font-semibold text-[#1F2A24] tracking-tight">
                    {weather ? `${Math.round(weather.temperature_2m)}°` : '--'}
                  </div>
                  <div className="text-xs font-['Inter'] font-bold text-[#A8503A] uppercase tracking-wide mt-1">
                    {weather ? getConditionText(weather.weather_code) : t('home.loading')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-['IBM_Plex_Mono'] text-xs">
                  <div className="bg-[#0B4D3C]/5 rounded-lg px-3 py-2 text-center">
                    <div className="text-[#1F2A24]/50 font-['Inter'] text-[10px] uppercase mb-0.5">Humidity</div>
                    <div className="font-bold text-[#1F2A24] text-base">{weather ? `${weather.relative_humidity_2m}%` : '--'}</div>
                  </div>
                  <div className="bg-[#0B4D3C]/5 rounded-lg px-3 py-2 text-center">
                    <div className="text-[#1F2A24]/50 font-['Inter'] text-[10px] uppercase mb-0.5">Wind</div>
                    <div className="font-bold text-[#1F2A24] text-base">{weather ? `${Math.round(weather.wind_speed_10m)}` : '--'} <span className="text-[10px]">km/h</span></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#0B4D3C]/15 flex items-center justify-between font-['Inter'] text-[11px] text-[#1F2A24]/60 font-medium">
                  <span>📍 Pamidi Mandal, AP</span>
                  <span className="text-[#0B4D3C] font-bold bg-[#0B4D3C]/10 px-2 py-1 rounded">● Live</span>
                </div>
              </div>
            </div>

            <div className="h-2 mx-4 bg-[#1F2A24]/30 rounded-b-full blur-sm" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;