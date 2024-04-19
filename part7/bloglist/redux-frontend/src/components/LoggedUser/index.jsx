import useUser from '../../hooks/useUser';
import styles from './styles.module.css';

const LoggedUser = () => {
	const { loggedUser, logout } = useUser();

	return (
		<div className={styles.container}>
			<p>| {loggedUser.name} logged in -</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default LoggedUser;
