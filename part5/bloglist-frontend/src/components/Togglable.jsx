import { useState } from 'react';

const Togglable = ({ formRef, label, children }) => {
	const [visible, setVisible] = useState(false);
	const toggleVisibility = () => setVisible(!visible);
	if (formRef) formRef.current = { toggleVisibility };

	return (
		<div>
			<button
				style={{ display: visible ? 'none' : '' }}
				onClick={toggleVisibility}
			>
				{label}
			</button>
			<div style={{ display: visible ? '' : 'none' }}>
				{children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	);
};

export default Togglable;
