import { GET_ALL_AUTHORS } from '../../queries/authors';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../../queries/books';
import { useState } from 'react';

import styles from './styles.module.css';

const NewBook = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);
	const [createBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: GET_ALL_AUTHORS }],
		onError: (error) => {
			console.log({ error });
		}
	});

	const submit = async (event) => {
		event.preventDefault();
		if (!title || !author || !published || !genres.length) return;

		createBook({ variables: { title, author, published: +published, genres } });
		setPublished('');
		setTitle('');
		setAuthor('');
		setGenres([]);
		setGenre('');
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre('');
	};

	return (
		<div className={styles.book_form}>
			<h2>Add New Book</h2>
			<form onSubmit={submit}>
				<div className={styles.form_input}>
					<span>Title:</span>
					<input value={title} onChange={({ target }) => setTitle(target.value)} />
				</div>
				<div className={styles.form_input}>
					<span>Author:</span>
					<input value={author} onChange={({ target }) => setAuthor(target.value)} />
				</div>
				<div className={styles.form_input}>
					<span>Published:</span>
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div className={styles.form_input}>
					<input value={genre} onChange={({ target }) => setGenre(target.value)} />
					<button onClick={addGenre} type='button'>
						Add genre
					</button>
				</div>
				<div className={styles.form_input}>
					<p>
						<span>Genres:</span>
						{genres.join(', ')}
					</p>
				</div>
				<button type='submit'>Create book</button>
			</form>
		</div>
	);
};

export default NewBook;
