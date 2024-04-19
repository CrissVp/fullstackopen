import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import AnecdoteList from './pages/AnecdoteList';
import CreateNew from './pages/CreateNew';
import About from './pages/About';

import Footer from './components/Footer';
import Anecdote from './pages/Anecdote';
import Menu from './components/Menu';

const initialAnecdotes = [
	{
		content: 'If it hurts, do it more often',
		author: 'Jez Humble',
		info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
		votes: 0,
		id: 1,
	},
	{
		content: 'Premature optimization is the root of all evil',
		author: 'Donald Knuth',
		info: 'http://wiki.c2.com/?PrematureOptimization',
		votes: 0,
		id: 2,
	},
];

const App = () => {
	const navigate = useNavigate();

	const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
	const [notification, setNotification] = useState('');

	const match = useMatch('/anecdote/:id');
	const anecdote = anecdotes.find((anec) => anec.id === +match?.params.id);

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setAnecdotes(anecdotes.concat(anecdote));

		navigate('/');
		setNotification(anecdote.content);

		setTimeout(() => {
			setNotification('');
		}, 5000);
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />

			{notification && (
				<div>
					<p>A new anecdote {`'${notification}'`} created!</p>
				</div>
			)}

			<Routes>
				<Route
					path='/'
					element={<AnecdoteList anecdotes={anecdotes} />}
				></Route>
				<Route
					path='/anecdote/:id'
					element={<Anecdote anecdote={anecdote} />}
				></Route>
				<Route path='/create' element={<CreateNew addNew={addNew} />}></Route>
				<Route path='/about' element={<About />}></Route>
			</Routes>

			<Footer />
		</div>
	);
};

export default App;
