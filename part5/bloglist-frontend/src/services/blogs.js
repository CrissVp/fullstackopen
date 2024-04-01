import loginService from './login';
const baseUrl = '/api/blogs';
import axios from 'axios';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: loginService.getToken() },
	};

	const response = await axios.post(baseUrl, newBlog, config);
	return response.data;
};

const update = async (id, data) => {
	const config = {
		headers: { Authorization: loginService.getToken() },
	};

	const response = await axios.put(`${baseUrl}/${id}`, data, config);
	return response.data;
};

const remove = async (id) => {
	const config = {
		headers: { Authorization: loginService.getToken() },
	};

	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};

const blogService = { getAll, create, update, remove };
export default blogService;
