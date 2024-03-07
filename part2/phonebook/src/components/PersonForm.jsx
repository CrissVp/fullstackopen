const PersonForm = ({ onSubmit, name, number, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={name} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        Number: <input value={number} onChange={(e) => onNumberChange(e.target.value)} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;