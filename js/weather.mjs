import { API_KEY } from './vars.mjs';

async function getWeatherByCoords({ lon, lat }, units = 'metric') {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    return (await fetch(url)).json();
}

export { getWeatherByCoords };