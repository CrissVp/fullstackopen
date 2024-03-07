import { useEffect, useState } from 'react';
import { useCountries } from './hooks/useCountries';

import SearchBar from './components/SearchBar';
import CountriesList from './components/CountriesList';

function App() {
  const {
    countriesToShow: countries,
    filterCountries,
    showCountry,
    resetList
  } = useCountries();

  const [search, setSearch] = useState('');

  useEffect(() => filterCountries(search), [search]);

  const handleShow = (name) => {
    showCountry(name);
  };

  const handleReset = () => {
    setSearch('');
    resetList();
  };

  return (
    <div style={{ padding: 20 }}>
      <SearchBar value={search} onChange={setSearch} />
      <button onClick={handleReset}>Reset</button>
      <CountriesList
        handleShow={handleShow}
        countries={countries}
        filtered={search !== ''}
      />
    </div>
  );
};

export default App;
