import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOGIN } from '../../queries/users';

import styles from './styles.module.css';

const Login = ({ handleLogin }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [login, result] = useMutation(LOGIN);

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			handleLogin(token);
		}
	}, [result.data]);

	const submit = (e) => {
		e.preventDefault();
		login({ variables: { username, password } });
	};

	return (
		<div className={styles.login_form}>
			<form onSubmit={submit}>
				<div className={styles.form_input}>
					<span>Username</span>
					<input value={username} onChange={({ target }) => setUsername(target.value)} />
				</div>
				<div className={styles.form_input}>
					<span>Password</span>
					<input
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button>Login</button>
			</form>
		</div>
	);
};

export default Login;
