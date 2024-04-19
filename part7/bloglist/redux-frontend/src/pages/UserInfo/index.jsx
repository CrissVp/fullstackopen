import userService from '../../services/users';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Blog from '../../components/Blog';
import styles from './styles.module.css';

const UserInfo = () => {
	const { id } = useParams();
	const [user, setUser] = useState();

	useEffect(() => {
		userService.getById(id).then((data) => setUser(data));
	}, []);

	if (!user) return null;

	return (
		<div className={styles.user_info_page}>
			<h2>{user.name}</h2>
			<h3>Added Blogs</h3>
			{user.blogs.length !== 0 ? (
				<ul>
					{user.blogs.map((blog) => (
						<li key={blog.id}>
							<Blog blog={blog} />
						</li>
					))}
				</ul>
			) : (
				<p>No blogs to show..</p>
			)}
		</div>
	);
};

export default UserInfo;
