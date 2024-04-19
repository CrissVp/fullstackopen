import useField from '../hooks/useField';

const CreateNew = (props) => {
	const content = useField('text');
	const author = useField('text');
	const info = useField('text');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.input.value,
			author: author.input.value,
			info: info.input.value,
			votes: 0,
		});
	};

	const resetForm = (e) => {
		e.preventDefault();

		content.reset();
		author.reset();
		info.reset();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content.input} />
				</div>
				<div>
					author
					<input {...author.input} />
				</div>
				<div>
					url for more info
					<input {...info.input} />
				</div>
				<button>create</button>
				<button type='button' onClick={resetForm}>
					reset
				</button>
			</form>
		</div>
	);
};

export default CreateNew;
