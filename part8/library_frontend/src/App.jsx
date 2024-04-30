import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED, GET_BOOKS_BY_GENRE } from './queries/books';
import { useEffect, useState } from 'react';

import RecommendedBooks from './components/RecommendedBooks';
import NewBook from './components/NewBook';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import Navbar from './components/Navbar';

const App = () => {
	const client = useApolloClient();
	const [token, setToken] = useState(null);
	const [page, setPage] = useState('authors');

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const bookAdded = data.data.bookAdded;
			client.cache.updateQuery({ query: GET_BOOKS_BY_GENRE }, ({ allBooks }) => {
				return {
					allBooks: allBooks.concat(bookAdded)
				};
			});
			
			window.alert('New Book Added');
		}
	});

	useEffect(() => {
		const userToken = localStorage.getItem('library_user_token');
		if (userToken) setToken(userToken);
	}, []);

	const login = (newToken) => {
		localStorage.setItem('library_user_token', newToken);
		client.resetStore();
		setPage('authors');
		setToken(newToken);
	};

	const logout = () => {
		if (page !== 'authors' && page !== 'books') setPage('authors');
		localStorage.clear();
		client.resetStore();
		setToken(null);
	};

	return (
		<>
			<Navbar>
				<button onClick={() => setPage('authors')}>Authors</button>
				<button onClick={() => setPage('books')}>Books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>Add book</button>
						<button onClick={() => setPage('recommended')}>Recommended</button>
						<button onClick={logout}>Logout</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>login</button>
				)}
			</Navbar>
			<div className='app_container'>
				{page === 'authors' && <Authors loggedIn={token !== null} />}

				{page === 'books' && <Books />}

				{page === 'add' && <NewBook />}

				{page === 'recommended' && <RecommendedBooks />}

				{page === 'login' && <Login handleLogin={login} />}
			</div>
		</>
	);
};

export default App;
