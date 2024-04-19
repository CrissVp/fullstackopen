import useBlogs from '../../hooks/useBlogs';
import { useState } from 'react';

import BlogsList from '../../components/BlogsList';
import NewBlog from '../../components/NewBlog';
import Modal from '../../components/Modal';
import styles from './styles.module.css';

const Blogs = () => {
	const { blogs, createBlog } = useBlogs();
	const [modalVisible, setModalVisible] = useState(false);

	const addBlog = async ({ title, author, url }) => {
		createBlog({ title, author, url });
		setModalVisible(false);
	};

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

			<BlogsList blogs={blogs} />
		</div>
	);
};

export default Blogs;
