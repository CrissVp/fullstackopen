import { useEffect, useState } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
	const [resources, setResources] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get(baseUrl);
			setResources(res.data);
		};

		fetchData();
	}, []);

	const create = async (resource) => {
		const res = await axios.post(baseUrl, resource);
		setResources((data) => [...data, res.data]);
	};

	const service = {
		create,
	};

	return [resources, service];
};

export default useResource;
