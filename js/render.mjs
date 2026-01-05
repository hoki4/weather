import { dom } from './dom.mjs';
import { getIcon } from './icons.mjs';
import { getDayName, round, mpsToKph, formatDegree } from './utils.mjs';

const weatherContainer = document.querySelector('.weather');

// Показать состояние загрузки
export function showLoading() {
  weatherContainer?.classList.add('weather--loading');
  weatherContainer?.classList.remove('weather--loaded');
}

// Скрыть загрузку, показать данные
export function hideLoading() {
  weatherContainer?.classList.remove('weather--loading');
  weatherContainer?.classList.add('weather--loaded');
}

// Рендер текущей погоды
export function renderCurrent(data, cityName) {
  dom.city.textContent = cityName || data.name;
  dom.temp.textContent = round(data.main.temp);
  dom.desc.textContent = data.weather[0].description;
  dom.feelsLike.textContent = round(data.main.feels_like);
  dom.max.textContent = formatDegree(data.main.temp_max);
  dom.min.textContent = formatDegree(data.main.temp_min);
  dom.humidity.textContent = `${data.main.humidity}%`;
  dom.wind.textContent = `${mpsToKph(data.wind.speed)}kph`;
  dom.pressure.textContent = `${data.main.pressure}hPa`;

  if (dom.tempIcon) {
    dom.tempIcon.innerHTML = getIcon(data.weather[0].main, 74);
  }
}

// Рендер прогноза
export function renderForecast(data) {
  const days = groupByDays(data.list, 7);

  dom.forecast.innerHTML = days.map((day) => `
    <article class="forecast-day">
      <h3 class="forecast-day__name">${getDayName(day.dt_txt)}</h3>
      <div class="forecast-day__icon" aria-hidden="true">
        ${getIcon(day.weather[0].main)}
      </div>
      <p class="forecast-day__desc">${day.weather[0].main}</p>
      <p class="forecast-day__range">
        <span>${formatDegree(day.main.temp_max)}</span>/<span class="forecast-day__muted">${formatDegree(day.main.temp_min)}</span>
      </p>
    </article>
  `).join('');
}

// Группировка по дням с вычислением min/max температур
function groupByDays(list, maxDays) {
  const dayGroups = {};

  // Группируем все записи по дням
  for (const item of list) {
    const date = item.dt_txt.split(' ')[0];

    if (!dayGroups[date]) {
      dayGroups[date] = [];
    }
    dayGroups[date].push(item);
  }

  // Обрабатываем каждый день
  const days = [];
  for (const items of Object.values(dayGroups)) {
    if (days.length >= maxDays) break;

    // Находим запись ближе к полудню для иконки и описания
    const noonItem = items.reduce((closest, item) => {
      const hour = parseInt(item.dt_txt.split(' ')[1]);
      const closestHour = parseInt(closest.dt_txt.split(' ')[1]);
      return Math.abs(hour - 12) < Math.abs(closestHour - 12) ? item : closest;
    });

    // Вычисляем реальные min/max за весь день
    const temps = items.map(item => item.main.temp);
    const tempMax = Math.max(...temps);
    const tempMin = Math.min(...temps);

    days.push({
      ...noonItem,
      main: {
        ...noonItem.main,
        temp_max: tempMax,
        temp_min: tempMin
      }
    });
  }

  return days;
}
