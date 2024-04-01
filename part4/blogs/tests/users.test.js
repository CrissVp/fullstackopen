const { describe, test, beforeEach, after } = require('node:test');
const User = require('../models/user');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const app = require('../app');
const api = supertest(app);

describe('users creation', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('TEST', 10);
		const user = new User({ username: 'TEST', passwordHash });
		await user.save();
	});

	test('succeed with statuscode 201 with valid data', async () => {
		const newUser = {
			username: 'Test1',
			name: 'Test Test',
			password: 'test1',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersInDb = await helper.getUsersInDb();
		const usernames = usersInDb.map((u) => u.username);
		assert(usernames.includes(newUser.username));
	});

	test('fails with statuscode 400 if username missing', async () => {
		const usersAtStart = await helper.getUsersInDb();

		const newUser = {
			name: 'Test Test',
			password: 'test',
		};

		const response = await api.post('/api/users').send(newUser).expect(400);
		const usersAtEnd = await helper.getUsersInDb();

		assert(response.body.error.includes('Path `username` is required'));
		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});

	test('fails with statuscode 400 if username already taken', async () => {
		const usersAtStart = await helper.getUsersInDb();

		const newUser = {
			username: 'TEST',
			name: 'TEST TEST',
			password: 'TEST',
		};

		const response = await api.post('/api/users').send(newUser).expect(400);
		const usersAtEnd = await helper.getUsersInDb();

		assert(response.body.error.includes('Expected `username` to be unique'));
		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});

	test('fails with statuscode 400 if username invalid length', async () => {
		const usersAtStart = await helper.getUsersInDb();

		const newUser = {
			username: 'te',
			name: 'Test Test',
			password: 'test',
		};

		const response = await api.post('/api/users').send(newUser).expect(400);
		const usersAtEnd = await helper.getUsersInDb();

		assert(response.body.error.includes('shorter than the minimum allowed'));
		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});

	test('fails with statuscode 400 if password invalid length', async () => {
		const usersAtStart = await helper.getUsersInDb();

		const newUser = {
			username: 'Test1',
			name: 'Test Test',
			password: 'te',
		};

		const response = await api.post('/api/users').send(newUser).expect(400);
		const usersAtEnd = await helper.getUsersInDb();

		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
		assert(
			response.body.error.includes(
				'Password has to be at least 3 characters long'
			)
		);
	});

	test('fails with statuscode 400 if password is missing', async () => {
		const usersAtStart = await helper.getUsersInDb();

		const newUser = {
			username: 'Test1',
			name: 'Test Test',
		};

		const response = await api.post('/api/users').send(newUser).expect(400);
		const usersAtEnd = await helper.getUsersInDb();

		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
		assert(response.body.error.includes('Password field cannot be empty'));
	});
});

after(async () => {
	await mongoose.connection.close();
});
