import {
	resetNotification,
	setNotification,
} from '../reducers/notificationReducer';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch, useSelector } from 'react-redux';

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const orderByVotes = (a, b) => b.votes - a.votes;

	const anecdotes = useSelector(({ filter, anecdotes }) => {
		const filterBy = (anecdote) => {
			return anecdote.content.toLowerCase().includes(filter.toLowerCase());
		};

		return anecdotes.filter(filterBy).sort(orderByVotes);
	});

	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote));
		dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
	};

	if (anecdotes.length === 0) {
		return (
			<div>
				<p>No anecdotes to show...</p>
			</div>
		);
	}

	return (
		<div className='anecdotes'>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<p>{anecdote.content}</p>
					<div className='votes'>
						<button onClick={() => vote(anecdote)}>vote</button>
						<span>Has {anecdote.votes}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
