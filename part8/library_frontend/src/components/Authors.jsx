import { GET_ALL_AUTHORS } from '../queries/authors';
import { useQuery } from '@apollo/client';

import AuthorBirthForm from './AuthorBirthForm';

const Authors = (props) => {
	const { data: authors, loading } = useQuery(GET_ALL_AUTHORS);

	if (loading) return <div>loading...</div>;
	if (authors?.allAuthors.length === 0) return <div>No data to show.</div>;

	return (
		<div>
			<div className='title'>
				<h2>Authors</h2>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Born</th>
						<th>Books</th>
					</tr>
				</thead>
				<tbody>
					{authors.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			{props.loggedIn && <AuthorBirthForm authors={authors.allAuthors} />}
		</div>
	);
};

export default Authors;
