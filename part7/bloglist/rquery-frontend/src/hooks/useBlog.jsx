import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../contexts/notificationContext';
import { useNavigate } from 'react-router-dom';
import blogService from '../services/blogs';
import { useEffect } from 'react';

const useBlog = (id) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { setNotification } = useNotification();

	useEffect(() => {
		return () => {
			queryClient.removeQueries({ queryKey: ['blog'], exact: true });
		};
	}, []);

	const { data, isLoading, isError } = useQuery({
		queryFn: () => blogService.getById(id),
		queryKey: ['blog'],
		retry: false
	});

	const commentMutation = useMutation({
		mutationFn: (content) => blogService.createComment(content, id),
		onSuccess: (addedComment) => {
			const blogData = queryClient.getQueryData(['blog']);
			queryClient.setQueryData(['blog'], {
				...blogData,
				comments: [...blogData.comments, addedComment]
			});
		},
		onError: (error) => {
			setNotification({ message: 'There was an error adding comment', type: 'error' });
		}
	});

	const likesMutation = useMutation({
		mutationFn: (likes) => blogService.update(id, { likes }),
		onSuccess: (updatedblog) => {
			const blogData = queryClient.getQueryData(['blog']);
			queryClient.setQueryData(['blog'], { ...blogData, likes: updatedblog.likes });

			setNotification({
				message: `You liked '${updatedblog.title} by ${updatedblog.author}'`,
				type: 'success'
			});
		},
		onError: (error) => {
			setNotification({ message: error.response.data.error, type: 'error' });
		}
	});

	const deleteBlogMutation = useMutation({
		mutationFn: () => blogService.remove(id),
		onSuccess: () => {
			const blogsData = queryClient.getQueryData(['blogs']);
			const blogData = blogsData.find((blog) => blog.id === id);

			setNotification({ message: `Blog '${blogData.title} removed'`, type: 'success' });
			queryClient.setQueryData(
				['blogs'],
				blogsData.filter((blog) => blog.id !== id)
			);

			navigate('/');
		},
		onError: (error) => {
			console.log({ error });
			setNotification({ message: 'There was an error removing the blog.', type: 'error' });
		}
	});

	const addBlogComment = (comment) => {
		if (!comment) return;
		commentMutation.mutate(comment);
	};

	const likeBlog = () => {
		likesMutation.mutate(data.likes + 1);
	};

	const removeBlog = () => {
		deleteBlogMutation.mutate();
	};

	return {
		blog: { data, isLoading, isError },
		addBlogComment,
		likeBlog,
		removeBlog
	};
};

export default useBlog;
