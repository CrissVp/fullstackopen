import { useEffect, useState } from "react";
import api from "../services/api";

const WEATHER_ICON_URL = 'https://openweathermap.org/img/wn/';

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [lat, lng] = country.capitalInfo.latlng;

  useEffect(() => {
    api
      .getWeather(lat, lng)
      .then(data => setWeather(data))
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <h3>{country.name.official}</h3>

      <p>Capital: <span>{country.capital[0]}</span></p>
      <p>Area: <span>{country.area}</span></p>

      <h4>Languages</h4>
      <ul>
        {Object.entries(country.languages).map(([key, lang]) => (
          <li key={key}>
            <span>{lang}</span>
          </li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      {weather && (
        <>
          <h4>Weather in {country.name.common}</h4>
          <p>Temperature: {weather?.main.temp}° C</p>
          <p>Wind: {weather?.wind.speed} m/s</p>
          <img
            height={80} width={80}
            src={`${WEATHER_ICON_URL}${weather?.weather[0].icon}.png`}
            alt={weather?.weather[0].description}
          />
        </>
      )}
    </div>
  );
};

export default CountryData;