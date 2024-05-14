import { DiaryEntry, NewEntryFormElements, Visibility, Weather } from './types';
import { createDiaryEntry, getDiaryEntries } from './services/diaryService';
import { FormEvent, useEffect, useState } from 'react';
import './App.css';

const Notification = ({ message }: { message: string }) => {
	if (!message) return null;
	return <p style={{ color: 'red' }}>{message}</p>;
};

function App() {
	const [entries, setEntries] = useState<DiaryEntry[]>([]);
	const [notification, setNotification] = useState('');

	useEffect(() => {
		const getEntries = async () => {
			const data = await getDiaryEntries();
			setEntries(data);
		};

		getEntries();
	}, []);

	const showNotification = (message: string) => {
		setNotification(message);
		setTimeout(() => {
			setNotification('');
		}, 3000);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formElements = form.elements as typeof form.elements & NewEntryFormElements;
		const { date, visibility, comment, weather } = formElements;

		const newEntry = {
			date: date.value,
			visibility: visibility.value,
			comment: comment.value,
			weather: weather.value
		};

		const [error, addedEntry] = await createDiaryEntry(newEntry);
		if (error) return showNotification(error);

		if (addedEntry) setEntries(entries.concat(addedEntry));
		form.reset();
	};

	return (
		<div>
			<h2>Add New Entry</h2>
			<Notification message={notification} />
			<form onSubmit={handleSubmit}>
				<div>
					<span>Date</span>
					<input type='date' name='date' />
				</div>
				<div>
					<span>Visibility</span>
					<select name='visibility'>
						{Object.values(Visibility).map((opt) => (
							<option key={opt} value={opt.toString()}>
								{opt.toString()}
							</option>
						))}
					</select>
				</div>
				<div>
					<span>Weather</span>
					<select name='weather'>
						{Object.values(Weather).map((opt) => (
							<option key={opt} value={opt.toString()}>
								{opt.toString()}
							</option>
						))}
					</select>
				</div>
				<div>
					<span>Comment</span>
					<input type='text' name='comment' />
				</div>
				<button>Create</button>
			</form>
			<h2>Diary Entries</h2>
			<ul>
				{entries.map((entry) => (
					<li key={entry.id}>
						<h4>{entry.date}</h4>
						<p>Comment: {entry.comment}</p>
						<p>Visibility: {entry.visibility}</p>
						<p>Weather: {entry.weather}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;

