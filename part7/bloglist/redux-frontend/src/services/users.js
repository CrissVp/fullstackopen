import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users';

const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

const getById = async (id) => {
	const res = await axios.get(`${baseUrl}/${id}`);
	return res.data;
};

const userService = { getAll, getById };
export default userService;
