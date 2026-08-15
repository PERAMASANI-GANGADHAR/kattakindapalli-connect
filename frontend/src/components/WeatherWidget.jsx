import React, { useState, useEffect } from 'react';

// మీ ఊరి Latitude/Longitude (Kattakindapalli, Pamidi mandal)
const VILLAGE_LAT = 14.9512;
const VILLAGE_LON = 77.5849;
const VILLAGE_NAME = 'కట్టకిందపల్లి';

const weatherCodeMap = {
  0: { label: 'నిర్మలమైన ఆకాశం', icon: '☀️' },
  1: { label: 'ఎక్కువగా నిర్మలం', icon: '🌤️' },
  2: { label: 'పాక్షిక మేఘావృతం', icon: '⛅' },
  3: { label: 'మేఘావృతం', icon: '☁️' },
  45: { label: 'పొగమంచు', icon: '🌫️' },
  48: { label: 'పొగమంచు', icon: '🌫️' },
  51: { label: 'తేలికపాటి జల్లులు', icon: '🌦️' },
  53: { label: 'మోస్తరు జల్లులు', icon: '🌦️' },
  55: { label: 'భారీ జల్లులు', icon: '🌧️' },
  61: { label: 'తేలికపాటి వర్షం', icon: '🌧️' },
  63: { label: 'మోస్తరు వర్షం', icon: '🌧️' },
  65: { label: 'భారీ వర్షం', icon: '⛈️' },
  80: { label: 'జల్లులు', icon: '🌦️' },
  81: { label: 'మోస్తరు జల్లులు', icon: '🌧️' },
  82: { label: 'తీవ్ర జల్లులు', icon: '⛈️' },
  95: { label: 'ఉరుములు, మెరుపులు', icon: '⛈️' },
};

const dayNames = ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'];

const formatHour = (hour) => {
  if (hour === 0) return '12 రా';
  if (hour < 12) return `${hour} ఉ`;
  if (hour === 12) return '12 మ';
  return `${hour - 12} మ`;
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showHourly, setShowHourly] = useState(false); // default: folded

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${VILLAGE_LAT}&longitude=${VILLAGE_LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=Asia%2FKolkata&forecast_days=7`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather data fetch failed');
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
        <p className="text-xs text-gray-500">వాతావరణ సమాచారం లోడ్ అవుతోంది...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-white rounded-xl border border-red-200 p-4 shadow-sm text-center">
        <p className="text-xs text-red-600">వాతావరణ సమాచారం అందుబాటులో లేదు.</p>
      </div>
    );
  }

  const current = weather.current;
  const isToday = selectedDay === 0;
  const dayCode = weatherCodeMap[weather.daily.weather_code[selectedDay]] || { label: 'తెలియదు', icon: '🌡️' };
  const rainChance = weather.daily.precipitation_probability_max[selectedDay];
  const selectedDate = new Date(weather.daily.time[selectedDay]);
  const dayLabel = isToday ? 'ఈరోజు' : dayNames[selectedDate.getDay()];
  const selectedDateStr = weather.daily.time[selectedDay];

  const hourlyIndices = weather.hourly.time
    .map((t, idx) => ({ t, idx }))
    .filter(({ t }) => t.startsWith(selectedDateStr));

  const rainWindows = [];
  let windowStart = null;
  hourlyIndices.forEach(({ t, idx }, i) => {
    const prob = weather.hourly.precipitation_probability[idx];
    const hour = new Date(t).getHours();
    if (prob >= 50) {
      if (windowStart === null) windowStart = hour;
    } else {
      if (windowStart !== null) {
        rainWindows.push({ start: windowStart, end: hour });
        windowStart = null;
      }
    }
    if (i === hourlyIndices.length - 1 && windowStart !== null) {
      rainWindows.push({ start: windowStart, end: hour + 1 });
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-[#EBDCC5] shadow-sm overflow-hidden">
      {/* Compact top row: current weather + 7-day strip in one bar */}
      <div
        className="p-3 md:p-4 text-white"
        style={{ background: 'linear-gradient(135deg, #3E7C97 0%, #8B4A2B 100%)' }}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{dayCode.icon}</span>
            <div>
              <p className="text-[10px] text-sky-100 font-bold uppercase leading-tight">{VILLAGE_NAME} • {dayLabel}</p>
              {isToday ? (
                <p className="text-xl font-extrabold leading-tight">{Math.round(current.temperature_2m)}°C <span className="text-[11px] font-normal text-sky-100">{dayCode.label}</span></p>
              ) : (
                <p className="text-xl font-extrabold leading-tight">
                  {Math.round(weather.daily.temperature_2m_max[selectedDay])}°/{Math.round(weather.daily.temperature_2m_min[selectedDay])}°
                  <span className="text-[11px] font-normal text-sky-100 ml-1">{dayCode.label}</span>
                </p>
              )}
            </div>
          </div>

          {rainWindows.length > 0 ? (
            <div className="bg-amber-400/90 text-amber-950 rounded-lg px-2.5 py-1 text-[10px] font-bold">
              ⚠️ {rainWindows.map((w, i) => (
                <span key={i}>{formatHour(w.start)}–{formatHour(w.end)}{i < rainWindows.length - 1 ? ', ' : ''}</span>
              ))} వర్షం
            </div>
          ) : (
            <div className="bg-white/15 rounded-lg px-2.5 py-1 text-[10px] font-bold">
              ✅ వర్షం అవకాశం తక్కువ ({rainChance}%)
            </div>
          )}
        </div>
      </div>

      {/* 7-Day strip - always visible, compact */}
      <div className="px-3 md:px-4 py-2 border-b border-[#F0DFC7]">
        <div className="flex gap-1.5 overflow-x-auto">
          {weather.daily.time.map((date, idx) => {
            const d = new Date(date);
            const code = weatherCodeMap[weather.daily.weather_code[idx]] || { icon: '🌡️' };
            const chance = weather.daily.precipitation_probability_max[idx];
            const isSelected = idx === selectedDay;
            return (
              <button
                key={date}
                onClick={() => setSelectedDay(idx)}
                className={`rounded-lg py-1.5 px-2 text-center shrink-0 w-14 transition cursor-pointer ${
                  isSelected ? 'bg-[#8B4A2B] text-white' : 'bg-[#FAF3E8] hover:bg-[#F3D9B1]/40'
                }`}
              >
                <p className={`text-[8px] font-bold ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                  {idx === 0 ? 'నేడు' : dayNames[d.getDay()]}
                </p>
                <p className="text-base leading-tight">{code.icon}</p>
                <p className={`text-[9px] font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                  {Math.round(weather.daily.temperature_2m_max[idx])}°
                </p>
                <p className={`text-[8px] font-bold ${isSelected ? 'text-sky-100' : chance >= 40 ? 'text-[#3E7C97]' : 'text-gray-400'}`}>
                  💧{chance}%
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hourly toggle */}
      <button
        onClick={() => setShowHourly(!showHourly)}
        className="w-full px-3 md:px-4 py-2 flex items-center justify-between text-[11px] font-bold text-[#8B4A2B] hover:bg-[#FAF3E8] transition cursor-pointer"
      >
        <span>🕐 {dayLabel} గంట గంటకి వర్ష సూచన చూడండి</span>
        <span className="text-sm">{showHourly ? '▲' : '▼'}</span>
      </button>

      {showHourly && (
        <div className="px-3 md:px-4 pb-3">
          <div className="flex gap-1.5 overflow-x-auto pt-1">
            {hourlyIndices
              .filter(({ t }) => new Date(t).getHours() % 3 === 0)
              .map(({ t, idx }) => {
                const hour = new Date(t).getHours();
                const code = weatherCodeMap[weather.hourly.weather_code[idx]] || { icon: '🌡️' };
                const prob = weather.hourly.precipitation_probability[idx];
                return (
                  <div
                    key={t}
                    className={`rounded-lg p-1.5 text-center shrink-0 w-14 ${
                      prob >= 50 ? 'bg-[#EAF4F8]' : 'bg-gray-50'
                    }`}
                  >
                    <p className="text-[8px] font-bold text-gray-500">{formatHour(hour)}</p>
                    <p className="text-base leading-tight">{code.icon}</p>
                    <p className="text-[8px] font-bold text-gray-700">{Math.round(weather.hourly.temperature_2m[idx])}°</p>
                    <p className={`text-[8px] font-bold ${prob >= 50 ? 'text-[#3E7C97]' : 'text-gray-400'}`}>💧{prob}%</p>
                  </div>
                );
              })}
          </div>
          <p className="text-[8px] text-gray-400 mt-1.5">సోర్స్: Open-Meteo • లైవ్ డేటా</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;