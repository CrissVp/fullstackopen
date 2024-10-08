import { useState } from 'react';

const useField = (type) => {
	const [value, setValue] = useState('');

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const reset = () => {
		setValue('');
	};

	const input = { type, value, onChange };
	return { input, reset };
};

export default useField;
