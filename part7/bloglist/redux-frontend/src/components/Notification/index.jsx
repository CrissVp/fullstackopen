import { useSelector } from 'react-redux';
import styles from './styles.module.css';

const Notification = () => {
	const notification = useSelector(({ notification }) => notification);

	if (!notification.message) return null;

	return (
		<div className={`${styles.notification} ${styles[notification.type]}`}>
			<p>{notification.message}</p>
		</div>
	);
};

export default Notification;
