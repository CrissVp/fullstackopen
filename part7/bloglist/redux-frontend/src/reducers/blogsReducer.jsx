import { setNotification } from './notificationReducer';
import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		addBlog(state, action) {
			return [...state, action.payload];
		},
		addCommentToBlog(state, action) {
			const { id, addedComment } = action.payload;
			return state.map((blog) =>
				blog.id !== id ? blog : { ...blog, comments: [...blog.comments, addedComment] }
			);
		},
		addLikeToBlog(state, action) {
			const { id, likes } = action.payload;
			return state.map((blog) => (blog.id !== id ? blog : { ...blog, likes }));
		},
		removeBlog(state, action) {
			const id = action.payload;
			return state.filter((blog) => blog.id !== id);
		}
	}
});

export const { setBlogs, addBlog, addCommentToBlog, addLikeToBlog, removeBlog } =
	blogsSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		try {
			const blogs = await blogService.getAll();
			dispatch(setBlogs(blogs));
		} catch (error) {
			console.log({ error });
			dispatch(setNotification({ message: 'There was an error loading blogs.', type: 'error' }));
		}
	};
};

export default blogsSlice.reducer;
