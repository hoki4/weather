import { API_KEY } from './vars.mjs';

async function getWeatherByCoords({ lon, lat }, units = 'metric') {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return (await fetch(url)).json();
}

async function getForecastByCoords({ lon, lat }, units = 'metric') {
  const url = `https://api.openweathermap.org/data/2.5/forecast?units=${units}&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return (await fetch(url)).json();
}

// Получить всё сразу
async function getAllWeather(coords, units = 'metric') {
  const [weather, forecast] = await Promise.all([
    getWeatherByCoords(coords, units),
    getForecastByCoords(coords, units),
  ]);
  return { weather, forecast };
}

export { getWeatherByCoords, getForecastByCoords, getAllWeather };
