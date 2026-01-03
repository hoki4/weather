import { API_KEY } from './vars.mjs';

async function getCoordsByName(title) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${title}&limit=5&appid=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const coords = {
        lat: json[0].lat,
        lon: json[0].lon,
    }
    const title_en = json[0].name;
    const origin = json[0].country.toLowerCase();
    const title_origin = json[0].local_names[origin];
    return { coords, title_en, title_origin };
}

export { getCoordsByName };