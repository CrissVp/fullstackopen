import { GET_BOOKS_BY_GENRE } from '../queries/books';
import { useQuery } from '@apollo/client';
import { ME } from '../queries/users';

import BooksTable from './BooksTable';

const RecommendedBooks = () => {
	const { data: user, loading: loadingUser } = useQuery(ME);
	const { data: books, loading: loadingBooks } = useQuery(GET_BOOKS_BY_GENRE, {
		skip: user?.me === undefined,
		variables: {
			genre: user?.me?.favoriteGenre
		}
	});

	if (loadingUser || loadingBooks) return <div>loading...</div>;

	return (
		<div>
			<div className='title'>
				<h2>Recommendations</h2>
				<p>
					Books in your favorite genre <strong>{user?.me?.favoriteGenre}</strong>
				</p>
			</div>
			<BooksTable books={books?.allBooks} />
		</div>
	);
};

export default RecommendedBooks;
