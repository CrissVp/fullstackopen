const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <p>Find Countries</p>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value.toLowerCase())} />
    </div>
  );
};

export default SearchBar;