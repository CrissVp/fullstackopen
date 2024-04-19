import { setNotification } from '../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import blogService from '../services/blogs';
import { useEffect } from 'react';
import {
	addCommentToBlog,
	addLikeToBlog,
	initializeBlogs,
	removeBlog
} from '../reducers/blogsReducer';

const useBlog = (id) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const blog = useSelector(({ blogs }) => blogs.find((item) => item.id === id));

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	const addComment = async (content) => {
		try {
			const addedComment = await blogService.createComment(content, blog.id);
			dispatch(addCommentToBlog({ id: blog.id, addedComment }));
		} catch (error) {
			console.log({ error });
			dispatch(setNotification({ message: 'There was an error adding comment.', type: 'error' }));
		}
	};

	const like = async () => {
		try {
			const updatedBlog = await blogService.update(blog.id, {
				likes: blog.likes + 1
			});

			dispatch(addLikeToBlog(updatedBlog));

			dispatch(
				setNotification({
					message: `You liked '${updatedBlog.title} by ${updatedBlog.author}'`,
					type: 'success'
				})
			);
		} catch (error) {
			console.log({ error });
			dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
		}
	};

	const remove = async () => {
		try {
			await blogService.remove(blog.id);
			dispatch(removeBlog(blog.id));
			navigate('/');

			dispatch(setNotification({ message: `Blog '${blog.title}' removed`, type: 'success' }));
		} catch (error) {
			console.log({ error });
			dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
		}
	};

	return { blog, addComment, like, remove };
};

export default useBlog;
