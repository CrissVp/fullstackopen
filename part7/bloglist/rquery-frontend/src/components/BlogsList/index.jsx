import PropTypes from 'prop-types';

import styles from './styles.module.css';
import Blog from '../Blog';

const BlogsList = ({ blogs }) => {
	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

	return (
		<div className={styles.list_container}>
			{sortedBlogs.map((blog) => (
				<Blog key={blog.id} blog={blog} showContent />
			))}
		</div>
	);
};

BlogsList.propTypes = {
	blogs: PropTypes.array.isRequired
};

export default BlogsList;
