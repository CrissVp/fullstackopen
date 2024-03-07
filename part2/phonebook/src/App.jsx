import React, { useEffect, useState } from 'react';
import personsService from './services/db';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState({})

  useEffect(() => {
    personsService
      .getAll()
      .then(data => setPersons(data))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) return alert('There are fields that need to be filled');

    const duplicated = persons.find(person => person.name === newName);
    if (duplicated) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        modifyPerson(duplicated);
      }

      return;
    }

    const newPerson = { name: newName, number: newNumber };
    personsService
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data));
        setNewNumber('');
        setNewName('');
      });

    setNotification({ message: `Successfully Added ${newPerson.name}`, type: 'success' });
    setTimeout(() => { setNotification({}) }, 3000);
  };

  const modifyPerson = (person) => {
    const modifiedPerson = { ...person, number: newNumber };

    personsService
      .modify(modifiedPerson.id, modifiedPerson)
      .then(data => {
        setPersons(persons.map(p => p.id !== data.id ? p : data));
        setNewNumber('');
        setNewName('');

        setNotification({ message: `Successfully Updated ${modifiedPerson.name}`, type: 'success' });
        setTimeout(() => { setNotification({}) }, 3000);
      })
      .catch(err => {
        setPersons(persons.filter(p => p.id !== person.id));

        setNotification({ message: `Information of ${modifiedPerson.name} has already been removed from server`, type: 'error' });
        setTimeout(() => { setNotification({}) }, 3000);
      })
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);

    if (confirm(`You want to delete person: ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));

          setNotification({ message: `Successfully Deleted ${person.name}`, type: 'success' });
          setTimeout(() => { setNotification({}) }, 3000);
        })
        .catch(err => {
          setPersons(persons.filter(person => person.id !== id));

          setNotification({ message: `Information of ${person.name} has already been removed from server`, type: 'error' });
          setTimeout(() => { setNotification({}) }, 3000);
        })
    }
  };

  return (
    <div className='container'>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={setFilter} />

      <Notification message={notification.message} type={notification.type} />

      <h2>Add New</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        onSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} filter={filter} />
    </div>
  );
};

export default App;
