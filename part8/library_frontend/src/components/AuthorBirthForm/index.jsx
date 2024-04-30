import { ADD_AUTHOR_BIRTH, GET_ALL_AUTHORS } from '../../queries/authors';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

import styles from './styles.module.css';

const AuthorBirthForm = ({ authors }) => {
	const [name, setName] = useState('');
	const [born, setBorn] = useState('');
	const [setAuthorBirth] = useMutation(ADD_AUTHOR_BIRTH, {
		refetchQueries: [{ query: GET_ALL_AUTHORS }]
	});

	const submit = (e) => {
		e.preventDefault();

		setAuthorBirth({ variables: { name, setBornTo: +born } });
		setName('');
		setBorn('');
	};

	return (
		<div className={styles.birth_form}>
			<h2>Set Birthyear</h2>
			<form onSubmit={submit}>
				<div className={styles.form_input}>
					<span>Name:</span>
					<select value={name} onChange={({ target }) => setName(target.value)}>
						{authors.map((a) => (
							<option key={a.id} value={a.name}>
								{a.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles.form_input}>
					<span>Born:</span>
					<input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
				</div>
				<button>Update Author</button>
			</form>
		</div>
	);
};

export default AuthorBirthForm;
