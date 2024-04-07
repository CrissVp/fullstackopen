import { createContext, useContext, useReducer } from 'react';

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.notification;
		case 'RESET_NOTIFICATION':
			return {};
		default:
			return state;
	}
};

export const useNotificationValue = () => {
	const { notification } = useContext(NotificationContext);
	return notification;
};

export const useNotificationDispatch = () => {
	const { dispatch } = useContext(NotificationContext);

	const setNotification = (notification) => {
		dispatch({ type: 'SET_NOTIFICATION', notification });

		setTimeout(() => {
			dispatch({ type: 'RESET_NOTIFICATION' });
		}, 5000);
	};

	return setNotification;
};

const NotificationContextProvider = ({ children }) => {
	const [notification, dispatch] = useReducer(notificationReducer, '');

	return (
		<NotificationContext.Provider value={{ notification, dispatch }}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContextProvider;
