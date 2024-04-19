import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../contexts/notificationContext';
import blogService from '../services/blogs';

const useBlogs = () => {
	const queryClient = useQueryClient();
	const { setNotification } = useNotification();

	const { data, isLoading, isError } = useQuery({
		queryFn: blogService.getAll,
		queryKey: ['blogs'],
		retry: false
	});

	const createBlogMutation = useMutation({
		mutationFn: blogService.create,
		onSuccess: (newBlog) => {
			const currentBlogs = queryClient.getQueryData(['blogs']);
			queryClient.setQueryData(['blogs'], [...currentBlogs, newBlog]);

			setNotification({
				message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
				type: 'success'
			});
		},
		onError: (error) => {
			setNotification({ message: error.response.data.error, type: 'error' });
		}
	});

	const createBlog = (blog) => {
		createBlogMutation.mutate(blog);
	};

	return {
		blogs: { data, isLoading, isError },
		createBlog
	};
};

export default useBlogs;
