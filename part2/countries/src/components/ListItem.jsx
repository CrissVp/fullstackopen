const ListItem = ({ country, handleShow }) => {
  return (
    <li>
      <span>{country.name.common}</span>
      <button onClick={() => handleShow(country.name.official)}>Show</button>
    </li>
  );
};

export default ListItem;