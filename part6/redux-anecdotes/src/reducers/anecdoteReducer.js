import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		setAnecdotes(state, action) {
			return action.payload;
		},
		addAnecdote(state, action) {
			return state.concat(action.payload);
		},
		incrementVotesOf(state, action) {
			const { id, votes } = action.payload;
			const anecdote = state.find((a) => a.id === id);

			return state.map((item) =>
				item.id !== id ? item : { ...anecdote, votes }
			);
		},
	},
});

export const { setAnecdotes, addAnecdote, incrementVotesOf } =
	anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createNew = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(addAnecdote(newAnecdote));
	};
};

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const modifiedAnecdote = await anecdoteService.vote(anecdote);
		dispatch(incrementVotesOf(modifiedAnecdote));
	};
};

export default anecdoteSlice.reducer;
