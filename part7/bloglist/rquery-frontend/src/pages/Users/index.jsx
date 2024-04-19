import userService from '../../services/users';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		userService.getAll().then((data) => setUsers(data));
	}, []);

	return (
		<div className={styles.users_page}>
			<h2>Users</h2>

			<table className={styles.users_table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>
									<span>{user.name}</span>
								</Link>
							</td>
							<td>
								<span>{user.blogs.length}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
