const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
	const fields = { author: 1, title: 1, url: 1, id: 1 };
	const users = await User.find({}).populate('blogs', fields);
	res.json(users);
});

usersRouter.post('/', async (req, res) => {
	const { username, name, password } = req.body;

	if (!password) throw Error('MissingPassword');
	if (password.length < 3) throw Error('InvalidPassword');

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		name,
		username,
		passwordHash,
	});

	const savedUser = await user.save();
	res.status(201).json(savedUser);
});

module.exports = usersRouter;
