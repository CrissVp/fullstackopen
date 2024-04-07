import notificationReducer from '../reducers/notificationReducer';
import anecdoteReducer from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		filter: filterReducer,
		anecdotes: anecdoteReducer,
		notification: notificationReducer,
	},
});

export default store;
