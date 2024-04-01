import styles from './styles.module.css';
import PropTypes from 'prop-types';

const LoggedUser = ({ user, setUser }) => {
	const handleLogOut = () => {
		localStorage.clear();
		setUser(null);
	};

	return (
		<div className={styles.container}>
			<p>{user.name} logged in</p>
			<button onClick={handleLogOut}>Logout</button>
		</div>
	);
};

LoggedUser.propTypes = {
	user: PropTypes.object.isRequired,
};

export default LoggedUser;
