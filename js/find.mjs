import { getCoordsByName } from './geo.mjs';
import { getWeatherByCoords } from './weather.mjs';

const searchForm = document.querySelector('.search__form');
const weatherCardCity = document.querySelector('.weather-card__city');
const tempElement = document.querySelector('.weather-card__temp-value > output');
const tempMinElement = document.querySelector('[data-min]');
const tempMaxElement = document.querySelector('[data-max]');

function initSearch() {
    searchForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const { coords, title_en, title_origin } = await getCoordsByName(evt.currentTarget.q.value);
        const data = await getWeatherByCoords(coords);

        weatherCardCity.textContent = `${title_en} (${title_origin})`;
        tempElement.textContent = data.main.temp;
        tempMinElement.textContent = data.main.temp_min;
        tempMaxElement.textContent = data.main.temp_max;
    });
}

export { initSearch };