const baseUrl = '/api/login';
import axios from 'axios';

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getToken = () => token;

const login = async (username, password) => {
	const response = await axios.post(baseUrl, { username, password });
	return response.data;
};

const loginService = { login, setToken, getToken };
export default loginService;
