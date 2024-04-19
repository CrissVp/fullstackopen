import { addBlog, initializeBlogs } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogs';
import { useEffect } from 'react';

const useBlogs = () => {
	const dispatch = useDispatch();
	const blogs = useSelector(({ blogs }) => blogs);

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	const createBlog = async (newBlog) => {
		try {
			const savedBlog = await blogService.create(newBlog);
			dispatch(addBlog(savedBlog));

			dispatch(
				setNotification({
					message: `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
					type: 'success'
				})
			);
		} catch (error) {
			dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
		}
	};

	return {
		blogs: [...blogs],
		createBlog
	};
};

export default useBlogs;
