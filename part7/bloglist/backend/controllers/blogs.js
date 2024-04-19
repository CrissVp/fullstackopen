const { userExtractor } = require('../utils/middleware');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
	const fields = { username: 1, name: 1, id: 1 };
	const blogs = await Blog.find({}).populate('user', fields);
	res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const fields = { username: 1, name: 1, id: 1 };
	const blog = await Blog.findById(id).populate('user', fields);
	res.json(blog);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
	const body = req.body;
	const user = await User.findById(req.user.id);

	const blog = new Blog({
		author: body.author,
		title: body.title,
		url: body.url,
		likes: body.likes || 0,
		user: user.id
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog.id);

	await user.save();
	res.status(201).json(savedBlog);
});

blogsRouter.put('/:id', userExtractor, async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	const blog = await Blog.findById(id);
	if (!blog) throw Error('DeletedResource');

	const updatedBlog = await Blog.findByIdAndUpdate(id, data, {
		new: true,
		runValidators: true,
		context: 'query'
	});

	res.json(updatedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
	const { id } = req.params;
	const blog = await Blog.findById(id);

	if (!blog) throw Error('DeletedResource');
	if (req.user.id !== blog.user.toString()) throw Error('Unauthorized');

	const user = await User.findById(blog.user);
	user.blogs = user.blogs.filter((blogId) => blogId !== blog._id);

	await blog.deleteOne();
	await user.save();
	res.status(204).end();
});

blogsRouter.post('/:id/comments', async (req, res) => {
	const { id } = req.params;
	const blog = await Blog.findById(id);

	const commentsLength = blog.comments.push(req.body);
	const updatedBlog = await blog.save();

	const { _id, content } = updatedBlog.comments[commentsLength - 1];
	const addedComment = { id: _id, content };
	res.json(addedComment);
});

module.exports = blogsRouter;
