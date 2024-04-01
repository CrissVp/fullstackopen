import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './styles.module.css';

const Blog = ({ blog, likeBlog, removeBlog, loggedUser }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div data-testid='blog_container' className={styles.blog_container}>
			<div data-testid='blog_title' className={styles.blog_title}>
				<p>
					{blog.title} - {blog.author}
				</p>

				{expanded ? (
					<button className={styles.button} onClick={() => setExpanded(false)}>
						hide
					</button>
				) : (
					<button className={styles.button} onClick={() => setExpanded(true)}>
						view
					</button>
				)}
			</div>

			{expanded && (
				<div data-testid='blog_info' className={styles.blog_info}>
					<p>{blog.url}</p>
					<div>
						<p>{blog.likes} likes</p>
						<button className={styles.button} onClick={() => likeBlog(blog)}>
							like
						</button>
					</div>
					<p>{blog.user.name}</p>
					{blog.user.id === loggedUser?.id && (
						<button
							onClick={() => removeBlog(blog)}
							className={`${styles.remove_btn} ${styles.button}`}
						>
							remove
						</button>
					)}
				</div>
			)}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default Blog;
