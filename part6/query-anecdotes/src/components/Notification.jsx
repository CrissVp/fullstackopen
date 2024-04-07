import { useNotificationValue } from '../contexts/NotificationContext';

const Notification = () => {
	const { content, type } = useNotificationValue();

	if (!content) return null;

	return (
		<div className={`notification ${type === 'success' ? 'success' : 'error'}`}>
			{content}
		</div>
	);
};

export default Notification;
