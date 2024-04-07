import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const setNotification = useNotificationDispatch();

	const queryMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));

			setNotification({
				content: `Added anecdote '${newAnecdote.content}'`,
				type: 'success',
			});
		},
		onError: () => {
			setNotification({
				content: 'Too short anecdote, must have length 5 or more.',
				type: 'error',
			});
		},
	});

	const onCreate = (event) => {
		event.preventDefault();

		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		queryMutation.mutate(content);
	};

	return (
		<div>
			<h3>Create new</h3>
			<form className='form' onSubmit={onCreate}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
