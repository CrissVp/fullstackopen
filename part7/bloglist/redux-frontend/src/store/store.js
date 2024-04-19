import notificationReducer from '../reducers/notificationReducer';
import blogsReducer from '../reducers/blogsReducer';
import userReducer from '../reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		blogs: blogsReducer,
		loggedUser: userReducer,
		notification: notificationReducer
	}
});

export default store;
