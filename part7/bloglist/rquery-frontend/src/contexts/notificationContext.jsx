import { useContext, useReducer, createContext } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.message;
		case 'RESET_NOTIFICATION':
			return {};
		default:
			return state;
	}
};

export const NotificationContext = createContext();

export const useNotification = () => {
	const [notification, dispatch] = useContext(NotificationContext);

	const setNotification = (message) => {
		dispatch({ type: 'SET_NOTIFICATION', message });

		setTimeout(() => {
			dispatch({ type: 'RESET_NOTIFICATION' });
		}, 3000);
	};

	return { notification, setNotification };
};

export default function NotificationContextProvider({ children }) {
	const [notification, dispatch] = useReducer(notificationReducer, {});

	return (
		<NotificationContext.Provider value={[notification, dispatch]}>
			{children}
		</NotificationContext.Provider>
	);
}
