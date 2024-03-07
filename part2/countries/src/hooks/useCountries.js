import { useEffect, useState } from "react";
import api from "../services/api";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    api
      .getAllCountries()
      .then(data => {
        setCountries(data);
        setCountriesToShow(data);
      })
  }, []);

  const filterCountries = (search) => {
    setCountriesToShow(
      countries.filter(country => country.name.common.toLowerCase().includes(search))
    );
  };

  const showCountry = (name) => {
    setCountriesToShow(countries.filter(country => country.name.official === name));
  };

  const resetList = () => {
    setCountriesToShow(countries);
  };

  return { countriesToShow, filterCountries, showCountry, resetList };
};