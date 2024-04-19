import styles from './styles.module.css';

const NewBlog = ({ addBlog }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		const { title, author, url } = e.target.elements;
		addBlog({ title: title.value, author: author.value, url: url.value });
		e.target.reset();
	};

	return (
		<div className={styles.form}>
			<h2>Create New Blog</h2>
			<form onSubmit={handleSubmit}>
				<div className={styles.form_input}>
					<span>Title</span>
					<input type='text' name='title' placeholder='Blog title' />
				</div>
				<div className={styles.form_input}>
					<span>Author</span>
					<input type='text' name='author' placeholder='Blog author' />
				</div>
				<div className={styles.form_input}>
					<span>Url</span>
					<input type='text' name='url' placeholder='Blog url' />
				</div>
				<div className={styles.form_button}>
					<button>Create</button>
				</div>
			</form>
		</div>
	);
};

export default NewBlog;
