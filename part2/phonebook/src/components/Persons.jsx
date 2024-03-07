const PersonData = ({ person, handleDelete }) => {
  return (
    <li>
      <p>Name: {person.name} - Number: {person.number}</p>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </li>
  );
};

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person) => (
          <PersonData key={person.id} person={person} handleDelete={deletePerson} />
        ))}
    </ul>
  );
};

export default Persons;