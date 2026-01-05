import { API_KEY } from './vars.mjs';

// Геокодинг: название → координаты
async function getCoordsByName(title) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${title}&limit=5&appid=${API_KEY}`;
  const response = await fetch(url);
  const json = await response.json();

  if (!json.length) {
    throw new Error('Город не найден');
  }

  const coords = {
    lat: json[0].lat,
    lon: json[0].lon,
  };
  const title_en = json[0].name;
  const origin = json[0].country.toLowerCase();
  const title_origin = json[0].local_names?.[origin] || title_en;

  return { coords, title_en, title_origin };
}

// Геолокация браузера
function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Геолокация не поддерживается'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error('Геолокация недоступна'));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

export { getCoordsByName, getBrowserLocation };
