const { test, describe, after, beforeEach } = require('node:test');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const supertest = require('supertest');
const assert = require('node:assert');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

const getToken = async () => {
	const user = { username: 'test', password: 'test' };
	const response = await api.post('/api/login').send(user);
	const { token } = response.body;
	return token;
};

beforeEach(async () => {
	await Blog.deleteMany({});

	await Promise.all(
		helper.testBlogs.map(async blog => {
			const blogObject = new Blog(blog);
			return await blogObject.save();
		})
	);
});

describe('checking blogs structure', () => {
	test('all blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const result = await helper.getBlogsInDb();
		assert.strictEqual(result.length, helper.testBlogs.length);
	});

	test('the unique identifier property of the blog is named id', async () => {
		const blogs = await helper.getBlogsInDb();
		const blogsProperties = blogs.map(blog => Object.keys(blog));
		assert(blogsProperties.every(properties => properties.includes('id')));
	});
});

describe('saving new blogs', async () => {
	const token = await getToken();

	test('successfully creates a new blog post', async () => {
		const newBlog = {
			author: 'TestAuthor',
			title: 'TestTitle',
			url: 'TestUrl',
			likes: 10,
		};

		const result = await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const resultContent = {
			author: result.body.author,
			title: result.body.title,
			url: result.body.url,
			likes: result.body.likes,
		};

		const blogsInDb = await helper.getBlogsInDb();
		assert.strictEqual(blogsInDb.length, helper.testBlogs.length + 1);
		assert.deepStrictEqual(resultContent, newBlog);
	});

	test('fails with statuscode 401 if token is not provided', async () => {
		const newBlog = {
			author: 'TestAuthor',
			title: 'TestTitle',
			url: 'TestUrl',
			likes: 10,
		};

		await api.post('/api/blogs').send(newBlog).expect(401);
	});

	test('if the likes property is missing, it will default to the value 0', async () => {
		const newBlog = {
			author: 'TestAuthor',
			title: 'TestTitle',
			url: 'TestUrl',
		};

		const result = await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		assert.strictEqual(result.body.likes, 0);
	});

	test('blog without title or url fails with statuscode 400', async () => {
		const newBlog = {
			author: 'TestAuthor',
			likes: 5,
		};

		await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlog)
			.expect(400);

		const blogsInDb = await helper.getBlogsInDb();
		assert.strictEqual(blogsInDb.length, helper.testBlogs.length);
	});
});

describe('deletion of blogs', async () => {
	const token = await getToken();

	test('succeeds with status code 204 if id is valid', async () => {
		const blogsInDb = await helper.getBlogsInDb();
		const blogToDelete = blogsInDb[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.auth(token, { type: 'bearer' })
			.expect(204);

		const blogsAfterDeletion = await helper.getBlogsInDb();
		const blogIdentifiers = blogsAfterDeletion.map(blog => blog.id);

		assert.strictEqual(blogsAfterDeletion.length, blogsInDb.length - 1);
		assert(!blogIdentifiers.includes(blogToDelete.id));
	});

	test('fails with statuscode 401 if token is not provided', async () => {
		const blogsInDb = await helper.getBlogsInDb();
		const blogToDelete = blogsInDb[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
		const blogsAfterDeletion = await helper.getBlogsInDb();
		assert.strictEqual(blogsAfterDeletion.length, blogsInDb.length);
	});

	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = 'A';
		await api
			.delete(`/api/blogs/${invalidId}`)
			.auth(token, { type: 'bearer' })
			.expect(400);
	});
});

describe('updating the information of an individual blog', async () => {
	const token = await getToken();

	test('succeds with status code 200 if data is valid', async () => {
		const blogsInDb = await helper.getBlogsInDb();
		const blogToUpdate = blogsInDb[0];

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.auth(token, { type: 'bearer' })
			.send({ likes: blogToUpdate.likes + 1 })
			.expect(200)
			.expect('Content-Type', /application\/json/);

		assert.strictEqual(updatedBlog.body.likes, blogToUpdate.likes + 1);
	});

	test('fails with statuscode 401 if token is not provided', async () => {
		const blogsInDb = await helper.getBlogsInDb();
		const blogToUpdate = blogsInDb[0];

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send({ likes: blogToUpdate.likes + 1 })
			.expect(401);
	});
});

after(async () => {
	await mongoose.connection.close();
});
