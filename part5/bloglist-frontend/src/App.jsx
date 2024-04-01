import { useState, useEffect, useRef } from 'react';
import './index.css';

import blogService from './services/blogs';
import loginService from './services/login';

import Notification from './components/Notification';
import LoggedUser from './components/LoggedUser';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogsList from './components/BlogsList';
import NewBlog from './components/NewBlog';

const App = () => {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [notification, setNotification] = useState({});

	const formRef = useRef({});

	useEffect(() => {
		const userJson = localStorage.getItem('userAuth');

		if (userJson) {
			const loggedUser = JSON.parse(userJson);
			loginService.setToken(loggedUser.token);
			setUser(loggedUser);
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const showNotification = ({ message, type }) => {
		setNotification({ message, type });

		setTimeout(() => {
			setNotification({});
		}, 3000);
	};

	const addBlog = async ({ title, author, url }) => {
		try {
			const savedBlog = await blogService.create({
				title,
				author,
				url,
			});

			const userData = {
				id: user.id,
				name: user.name,
				username: user.username,
			};

			formRef.current.toggleVisibility();
			setBlogs((data) => [...data, { ...savedBlog, user: userData }]);

			showNotification({
				message: `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
				type: 'success',
			});
		} catch (error) {
			showNotification({
				message: error.response.data.error,
				type: 'error',
			});
		}
	};

	const likeBlog = async (blog) => {
		try {
			const result = await blogService.update(blog.id, {
				likes: blog.likes + 1,
			});

			setBlogs((data) => {
				const index = data.findIndex((blog) => blog.id === result.id);
				data[index] = { ...blog, likes: result.likes };
				return [...data];
			});
		} catch (error) {
			showNotification({
				message: error.response.data.error,
				type: 'error',
			});
		}
	};

	const removeBlog = async (blog) => {
		if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			const result = await blogService.remove(blog.id);
			setBlogs(blogs.filter((b) => b.id !== blog.id));
		}
	};

	if (!user) return <LoginForm setUser={setUser} />;

	return (
		<div className='app_container'>
			<h2>Blogs</h2>

			<Notification message={notification.message} type={notification.type} />

			<LoggedUser user={user} setUser={setUser} />

			<Togglable formRef={formRef} label={'New Blog'}>
				<NewBlog addBlog={addBlog} />
			</Togglable>

			<BlogsList
				blogs={blogs}
				loggedUser={user}
				likeBlog={likeBlog}
				removeBlog={removeBlog}
			/>
		</div>
	);
};

export default App;
