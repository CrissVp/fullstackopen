import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';

const useCountry = (name) => {
	const [country, setCountry] = useState(null);

	useEffect(() => {
		if (name) {
			axios
				.get(`${baseUrl}/${name}`)
				.then((res) => setCountry(res.data))
				.catch(() => setCountry({}));
		}
	}, [name]);

	return country;
};

export default useCountry;
