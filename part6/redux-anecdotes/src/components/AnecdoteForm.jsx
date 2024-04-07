import {
	resetNotification,
	setNotification,
} from '../reducers/notificationReducer';

import { createNew } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const newAnecdote = async (e) => {
		e.preventDefault();

		const content = e.target.content.value;
		e.target.reset();

		dispatch(createNew(content));
		dispatch(setNotification(`Created anecdote '${content}'`, 5));
	};

	return (
		<>
			<h2>Create new</h2>
			<form onSubmit={newAnecdote} className='form'>
				<div>
					<input name='content' />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
