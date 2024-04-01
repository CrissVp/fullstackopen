import { useState } from 'react';
import loginService from '../services/login';
import Notification from './Notification';

const LoginForm = ({ setUser }) => {
	const [notification, setNotification] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { username, password } = e.target.elements;
			const user = await loginService.login(username.value, password.value);
			localStorage.setItem('userAuth', JSON.stringify(user));
			loginService.setToken(user.token);
			setUser(user);
		} catch (error) {
			setNotification({ message: error.response.data.error, type: 'error' });
			setTimeout(() => {
				setNotification({});
			}, 3000);
		}
	};

	return (
		<div>
			<h2>Log in to application</h2>
			<Notification message={notification.message} type={notification.type} />
			<form onSubmit={handleSubmit}>
				<div>
					<span>Username</span>
					<input type='text' name='username' />
				</div>
				<div>
					<span>Password</span>
					<input type='text' name='password' />
				</div>
				<button>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
