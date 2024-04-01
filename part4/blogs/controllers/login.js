const loginRouter = require('express').Router();
const { SECRET } = require('../utils/config');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });

	const passwordCorrect =
		user !== null ? await bcrypt.compare(password, user.passwordHash) : false;

	if (!(user && passwordCorrect)) throw Error('InvalidCredentials');

	const userForToken = {
		id: user.id,
		username: user.username,
	};

	const token = jwt.sign(userForToken, SECRET, {
		expiresIn: 60 * 60,
	});

	res
		.status(200)
		.send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
