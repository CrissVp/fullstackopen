import useBlogs from '../../hooks/useBlogs';
import { useState } from 'react';

import BlogsList from '../../components/BlogsList';
import NewBlog from '../../components/NewBlog';
import Modal from '../../components/Modal';
import styles from './styles.module.css';

const Blogs = () => {
	const { blogs, createBlog } = useBlogs();
	const [modalVisible, setModalVisible] = useState(false);

	const addBlog = async (blog) => {
		setModalVisible(false);
		createBlog(blog);
	};

	if (blogs.isLoading) return <div>Loading...</div>;
	if (blogs.isError) return <div>There was an error loading blogs.</div>;

	return (
		<div className={styles.blogs_page}>
			<div className={styles.blogs_page_header}>
				<h2>Blogs</h2>
				<button onClick={() => setModalVisible(true)}>New Blog</button>
			</div>

			{modalVisible && (
				<Modal close={() => setModalVisible(false)}>
					<NewBlog addBlog={addBlog} />
				</Modal>
			)}

			<BlogsList blogs={blogs.data} />
		</div>
	);
};

export default Blogs;
