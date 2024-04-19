import Notification from '../Notification';
import Modal from '../Modal';

import useUser from '../../hooks/useUser';
import styles from './styles.module.css';

const LoginForm = () => {
	const { login } = useUser();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { username, password } = e.target.elements;
		login(username.value, password.value);
	};

	return (
		<div className={styles.container}>
			<Modal>
				<div className={styles.form}>
					<h2>Log in to application</h2>
					<Notification />
					<form onSubmit={handleSubmit}>
						<div className={styles.form_input}>
							<span>Username</span>
							<input type='text' name='username' />
						</div>
						<div className={styles.form_input}>
							<span>Password</span>
							<input type='password' name='password' />
						</div>
						<button>Login</button>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default LoginForm;
