import { GET_BOOKS_BY_GENRE } from '../queries/books';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import BooksTable from './BooksTable';

const Books = () => {
	const [genreSet, setGenreSet] = useState(undefined);
	const [genreFilter, setGenreFilter] = useState('all books');
	const { data: books, loading } = useQuery(GET_BOOKS_BY_GENRE, {
		variables: {
			genre: genreFilter !== 'all books' ? genreFilter : undefined
		}
	});

	useEffect(() => {
		if (!genreSet && !loading) {
			setGenreSet([...new Set(books.allBooks.map((b) => b.genres).flat())]);
		}
	}, [loading]);

	if (loading) return <div>loading...</div>;
	if (books?.allBooks.length === 0) return <div>No data to show.</div>;

	return (
		<div>
			<div className='title'>
				<h2>Books</h2>

				<div>
					<span>Filter by genre:</span>
					<select value={genreFilter} onChange={({ target }) => setGenreFilter(target.value)}>
						<option key={'all books'} value='all books'>
							all books
						</option>
						{genreSet?.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>
			</div>

			<BooksTable books={books.allBooks} />
		</div>
	);
};

export default Books;
