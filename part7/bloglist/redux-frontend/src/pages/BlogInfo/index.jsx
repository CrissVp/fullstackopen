import { useParams } from 'react-router-dom';
import useBlog from '../../hooks/useBlog';
import useUser from '../../hooks/useUser';
import styles from './styles.module.css';

const BlogInfo = () => {
	const { id } = useParams();
	const { loggedUser } = useUser();
	const { blog, addComment, like, remove } = useBlog(id);

	const createComment = async (e) => {
		e.preventDefault();

		const content = e.target.elements.comment.value;
		addComment(content);
		e.target.reset();
	};

	const removeBlog = async () => {
		if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			remove();
		}
	};

	if (!blog) return null;

	return (
		<div>
			<div className={styles.blog_info}>
				<h2>
					{blog.title} - {blog.author}
				</h2>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita odio optio neque libero
					placeat aut provident eveniet, delectus harum. Dolorem corporis nulla porro molestias
					obcaecati vel praesentium eum ut incidunt.
				</p>
				<div>
					<span>{blog.likes} likes</span>
					<button onClick={like}>like</button>
					{loggedUser.id === blog.user.id && <button onClick={removeBlog}>remove</button>}
				</div>
				<div>
					<p>Added by {blog.user.name}</p>
				</div>
				<div>
					<p>See more info</p>
					<a href='#'>
						<p>{blog.url}</p>
					</a>
				</div>
			</div>
			<div className={styles.blog_comments}>
				<h4>Comments</h4>
				<form onSubmit={createComment}>
					<input type='text' name='comment' placeholder='Add a new comment' />
					<button>Add Comment</button>
				</form>
				<ul>
					{blog.comments.map((comment) => (
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
