import CountryData from "./CountryData";
import ListItem from "./ListItem";

const CountriesList = ({ countries, filtered, handleShow }) => {
  console.log({ countries })

  if (countries.length === 1) {
    return (
      <CountryData country={countries[0]} />
    );
  };

  if (filtered && countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  };

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <ListItem key={country.name.official} country={country} handleShow={handleShow} />
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;