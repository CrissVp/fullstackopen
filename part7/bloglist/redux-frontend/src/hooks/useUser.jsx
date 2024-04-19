import { setNotification } from '../reducers/notificationReducer';
import { resetUser, setUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import loginService from '../services/login';
import { useEffect } from 'react';

const useUser = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ loggedUser }) => loggedUser);

	useEffect(() => {
		const userJson = localStorage.getItem('userAuth');

		if (!userJson) {
			dispatch(resetUser());
		}

		if (userJson) {
			const userData = JSON.parse(userJson);
			loginService.setToken(userData.token);
			dispatch(setUser(userData));
		}
	}, []);

	const login = async (username, password) => {
		try {
			const userData = await loginService.login(username, password);
			localStorage.setItem('userAuth', JSON.stringify(userData));
			loginService.setToken(userData.token);
			dispatch(setUser(userData));
		} catch (error) {
			dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
		}
	};

	const logout = () => {
		localStorage.clear();
		dispatch(resetUser());
	};

	return { loggedUser: user.data, userState: user.state, login, logout };
};

export default useUser;
