import useField from './hooks/useField';
import useResource from './hooks/useResource';

const App = () => {
	const name = useField('text');
	const number = useField('text');
	const content = useField('text');

	const [notes, noteService] = useResource('http://localhost:3005/notes');
	const [persons, personService] = useResource('http://localhost:3005/persons');

	const handleNoteSubmit = (event) => {
		event.preventDefault();

		noteService.create({ content: content.input.value });
		content.reset();
	};

	const handlePersonSubmit = (event) => {
		event.preventDefault();

		personService.create({
			name: name.input.value,
			number: number.input.value,
		});

		name.reset();
		number.reset();
	};

	return (
		<div>
			<h2>Notes</h2>
			<form onSubmit={handleNoteSubmit}>
				<div>
					<input {...content.input} />
					<button>create</button>
				</div>
			</form>

			<div>
				{notes.map((n) => (
					<p key={n.id}>{n.content}</p>
				))}
			</div>

			<h2>Persons</h2>
			<form onSubmit={handlePersonSubmit}>
				<div>
					<span>name</span>
					<input {...name.input} />
				</div>
				<div>
					<span>number</span>
					<input {...number.input} />
				</div>
				<button>create</button>
			</form>

			<div>
				{persons.map((n) => (
					<p key={n.id}>
						{n.name} {n.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
