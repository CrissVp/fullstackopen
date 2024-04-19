import { useUser } from '../../contexts/userContext';
import { useParams } from 'react-router-dom';
import useBlog from '../../hooks/useBlog';
import styles from './styles.module.css';

const BlogInfo = () => {
	const { id } = useParams();
	const { loggedUser } = useUser();
	const { blog, addBlogComment, likeBlog, removeBlog } = useBlog(id);

	const addComment = async (e) => {
		e.preventDefault();

		const { comment } = e.target.elements;
		addBlogComment(comment.value);
		e.target.reset();
	};

	const remove = async () => {
		if (confirm(`Remove blog ${blog.data.title} by ${blog.data.author}`)) {
			removeBlog();
		}
	};

	if (blog.isLoading) return <div>Loading...</div>;
	if (blog.isError) return <div>There was an error loading the blog.</div>;

	return (
		<div>
			<div className={styles.blog_info}>
				<h2>
					{blog.data.title} - {blog.data.author}
				</h2>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita odio optio neque libero
					placeat aut provident eveniet, delectus harum. Dolorem corporis nulla porro molestias
					obcaecati vel praesentium eum ut incidunt.
				</p>
				<div>
					<span>{blog.data.likes} likes</span>
					<button onClick={likeBlog}>like</button>
					{blog.data.user.id === loggedUser.id && <button onClick={remove}>remove</button>}
				</div>
				<div>
					<p>Added by {blog.data.user.name}</p>
				</div>
				<div>
					<p>See more info</p>
					<a href='#'>
						<p>{blog.data.url}</p>
					</a>
				</div>
			</div>
			<div className={styles.blog_comments}>
				<h4>Comments</h4>
				<form onSubmit={addComment}>
					<input type='text' name='comment' placeholder='Add a new comment' />
					<button>Add Comment</button>
				</form>
				<ul>
					{blog.data.comments.map((comment) => (
						<li key={comment.id}>
							<p>{comment.content}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BlogInfo;
