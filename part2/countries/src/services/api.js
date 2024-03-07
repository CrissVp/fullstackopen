import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const COUNTRIES_ENDPOINT = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';

const getAllCountries = () => {
  return axios
    .get(COUNTRIES_ENDPOINT)
    .then(res => res.data)
};

const getWeather = (lat, lng) => {
  return axios
    .get(`${WEATHER_ENDPOINT}lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`)
    .then(res => res.data)
};

export default { getAllCountries, getWeather };