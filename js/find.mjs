import { getCoordsByName, getBrowserLocation } from './geo.mjs';
import { getAllWeather } from './weather.mjs';
import { renderCurrent, renderForecast, showLoading, hideLoading } from './render.mjs';
import { dom } from './dom.mjs';

const DEFAULT_CITY = 'Paris';

// Загрузить погоду по координатам
async function loadByCoords(coords, cityName = null) {
  showLoading();
  
  try {
    const { weather, forecast } = await getAllWeather(coords);
    renderCurrent(weather, cityName);
    renderForecast(forecast);
  } finally {
    hideLoading();
  }
}

// Загрузить погоду по названию города
async function loadByCity(city) {
  showLoading();
  
  try {
    const { coords, title_en, title_origin } = await getCoordsByName(city);
    const displayName = title_origin !== title_en
      ? `${title_en} (${title_origin})`
      : title_en;

    const { weather, forecast } = await getAllWeather(coords);
    renderCurrent(weather, displayName);
    renderForecast(forecast);
  } finally {
    hideLoading();
  }
}

// Начальная загрузка — сначала геолокация, потом фоллбэк
async function loadInitial() {
  try {
    const coords = await getBrowserLocation();
    await loadByCoords(coords);
  } catch (err) {
    console.log('Геолокация недоступна:', err.message);
    await loadByCity(DEFAULT_CITY);
  }
}

// Обработчик поиска
function handleSearch(evt) {
  evt.preventDefault();
  const city = evt.currentTarget.q.value.trim();

  if (city) {
    loadByCity(city).catch((err) => {
      console.error(err);
      alert('Город не найден');
    });
  }
}

function initSearch() {
  dom.searchForm?.addEventListener('submit', handleSearch);
  loadInitial();
}

export { initSearch };
