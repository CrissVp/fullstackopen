const { SECRET } = require('./config');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({
			error: 'Malformatted id',
		});
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({
			error: error.message,
		});
	}

	if (
		error.name === 'MongoServerError' &&
		error.message.includes('E11000 duplicate key error')
	) {
		return res.status(400).json({
			error: 'Expected `username` to be unique',
		});
	}

	if (error.message === 'MissingPassword') {
		return res.status(400).json({
			error: 'Password field cannot be empty',
		});
	}

	if (error.message === 'InvalidPassword') {
		return res.status(400).json({
			error: 'Password has to be at least 3 characters long',
		});
	}

	if (error.message === 'InvalidCredentials') {
		return res.status(401).json({
			error: 'Invalid username or password',
		});
	}

	if (error.message === 'InvalidToken') {
		return res.status(401).json({
			error: 'Invalid token',
		});
	}

	if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({
			error: 'Token missing or invalid',
		});
	}

	if (error.name === 'TokenExpiredError') {
		return res.status(401).json({
			error: 'Token expired',
		});
	}

	if (error.message === 'Unauthorized') {
		return res.status(401).json({
			error: 'Credentials received are not authorized',
		});
	}

	if (error.message === 'DeletedResource') {
		return res.status(404).json({
			error: 'Data already deleted from server',
		});
	}

	next(error);
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: 'Unknown Endpoint',
	});
};

const tokenExtractor = (request, response, next) => {
	const auth = request.get('authorization');
	if (auth && auth.startsWith('Bearer ')) {
		request.token = auth.replace('Bearer ', '');
	}

	next();
};

const userExtractor = async (req, res, next) => {
	const decodedToken = jwt.verify(req.token, SECRET);
	if (!decodedToken.id) throw Error('InvalidToken');
	req.user = decodedToken;
	next();
};

module.exports = {
	errorHandler,
	unknownEndpoint,
	tokenExtractor,
	userExtractor,
};
