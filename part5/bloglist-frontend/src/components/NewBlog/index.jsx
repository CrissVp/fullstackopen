const NewBlog = ({ addBlog }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		const { title, author, url } = e.target.elements;
		addBlog({
			title: title.value,
			author: author.value,
			url: url.value,
		});

		e.target.reset();
	};

	return (
		<div>
			<h2>Create New Blog</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<span>Title</span>
					<input type='text' name='title' placeholder='Blog title' />
				</div>
				<div>
					<span>Author</span>
					<input type='text' name='author' placeholder='Blog author' />
				</div>
				<div>
					<span>Url</span>
					<input type='text' name='url' placeholder='Blog url' />
				</div>
				<button>Create</button>
			</form>
		</div>
	);
};

export default NewBlog;
