import React, { useState, useEffect } from 'react';

// పమిడి మండలం, అనంతపూర్ జిల్లా (Kattakindapalli సమీపంలో) coordinates
const LAT = 14.9667;
const LON = 77.5833;

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Weather fetch failed:', err);
        setLoading(false);
      });
  }, []);

  const getConditionText = (code) => {
    if (code === 0) return '☀️ Sunny';
    if (code === 1 || code === 2) return '🌤️ Partly Cloudy';
    if (code === 3) return '☁️ Cloudy';
    if (code >= 45 && code <= 48) return '🌫️ Foggy';
    if (code >= 51 && code <= 67) return '🌧️ Rainy';
    if (code >= 80 && code <= 82) return '🌦️ Showers';
    if (code >= 95) return '⛈️ Stormy';
    return '🌤️ Clear';
  };

  if (loading) {
    return (
      <div className="weather-card">
        <h2>🌤️ Today's Weather</h2>
        <p>లోడ్ అవుతోంది...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather-card">
        <h2>🌤️ Today's Weather</h2>
        <p>వాతావరణ సమాచారం అందుబాటులో లేదు</p>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <h2>🌤️ Today's Weather</h2>

      <h1>{Math.round(weather.temperature_2m)}°C</h1>

      <p>{getConditionText(weather.weather_code)}</p>

      <hr />

      <p>💧 Humidity : {weather.relative_humidity_2m}%</p>

      <p>🌬️ Wind : {Math.round(weather.wind_speed_10m)} km/h</p>

      <p>📍 Katta Kinda Palli</p>
    </div>
  );
}

export default WeatherCard;