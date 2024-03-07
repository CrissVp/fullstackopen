const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter By: <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default Filter;