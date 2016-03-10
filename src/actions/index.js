import axios from 'axios';
const API_KEY = 'ac357469057905617e56a65d5acbeeea';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},GB`;
    const request = axios.get(url);
    return {
        type: FETCH_WEATHER,
        payload: request // payload key is 'magic' - middlewares look at this property
    };
}