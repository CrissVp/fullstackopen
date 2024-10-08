import React, { useState, useEffect } from 'react';

import useField from './hooks/useField';
import useCountry from './hooks/useCountry';

import Country from './components/Country';

const App = () => {
	const [name, setName] = useState('');
	const nameInput = useField('text');
	const country = useCountry(name);

	console.log({ country,});

	const fetch = (e) => {
		e.preventDefault();
		setName(nameInput.value);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	);
};

export default App;
