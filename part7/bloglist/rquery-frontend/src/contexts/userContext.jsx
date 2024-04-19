import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNotification } from './notificationContext';
import loginService from '../services/login';

const userReducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.user;
		case 'CLEAR_USER':
			return null;
		default:
			return state;
	}
};

export const LoggedUserContext = createContext();

export const useUser = () => {
	const { loggedUser, dispatch } = useContext(LoggedUserContext);
	const { setNotification } = useNotification();

	useEffect(() => {
		const userJson = localStorage.getItem('userAuth');

		if (!userJson) {
			dispatch({ type: 'CLEAR_USER' });
		}

		if (userJson) {
			const userData = JSON.parse(userJson);
			loginService.setToken(userData.token);
			dispatch({ type: 'SET_USER', user: userData });
		}
	}, []);

	const login = async (username, password) => {
		try {
			const user = await loginService.login(username, password);
			localStorage.setItem('userAuth', JSON.stringify(user));
			loginService.setToken(user.token);
			dispatch({ type: 'SET_USER', user });
		} catch (error) {
			setNotification({ message: error.response.data.error, type: 'error' });
		}
	};

	const logout = () => {
		localStorage.clear();
		dispatch({ type: 'CLEAR_USER' });
	};

	return { loggedUser, login, logout };
};

const UserContextProvider = ({ children }) => {
	const [loggedUser, dispatch] = useReducer(userReducer, undefined);

	return (
		<LoggedUserContext.Provider value={{ loggedUser, dispatch }}>
			{children}
		</LoggedUserContext.Provider>
	);
};

export default UserContextProvider;
