import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './contexts/NotificationContext';
import { getAnecdotes, updateAnecdote } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
	const queryClient = useQueryClient();
	const setNotification = useNotificationDispatch();

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: false,
	});

	const anecdotes = result.data;

	const updateMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(
				['anecdotes'],
				anecdotes.map((anecdote) =>
					anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
				)
			);

			setNotification({
				content: `You voted '${updatedAnecdote.content}'`,
				type: 'success',
			});
		},
	});

	const handleVote = (anecdote) => {
		updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
	};

	if (result.isLoading) {
		return <div>Loading data...</div>;
	}

	if (result.isError) {
		return <div>Anecdote service not available due to problems in server</div>;
	}

	return (
		<div>
			<h2>Anecdote app</h2>

			<Notification />

			<div className='anecdotes'>
				{anecdotes.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div className='votes'>
							<button onClick={() => handleVote(anecdote)}>vote</button>
							<span>Has {anecdote.votes}</span>
						</div>
					</div>
				))}
			</div>

			<AnecdoteForm />
		</div>
	);
};

export default App;
