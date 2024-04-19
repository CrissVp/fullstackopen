import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Blog = ({ blog, showContent }) => {
	return (
		<div data-testid='blog_container' className={styles.blog_container}>
			<div data-testid='blog_title' className={styles.blog_title}>
				<Link to={`/blogs/${blog.id}`}>
					<p>
						{blog.title} - {blog.author}
					</p>
				</Link>
			</div>
			<div className={styles.blog_body}>
				{showContent && (
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo alias non incidunt
						earum enim fugiat praesentium atque totam obcaecati voluptatum? Voluptatem quasi earum
						ipsam nesciunt, ex accusantium quis quia numquam.
					</p>
				)}
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired
};

export default Blog;
