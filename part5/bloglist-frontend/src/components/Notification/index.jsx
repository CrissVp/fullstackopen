import styles from './styles.module.css';

const Notification = ({ message, type }) => {
	if (!message) {
		return null;
	}

	return (
		<div className={`${styles.notification} ${styles[type]}`}>
			<p>{message}</p>
		</div>
	);
};

export default Notification;
