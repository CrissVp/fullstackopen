require('express-async-errors');

const middlewares = require('./utils/middleware');
const { DB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose
	.connect(DB_URI)
	.then(() => logger.info('Connected to MongoDB'))
	.catch(err => logger.error('Error connecting to MongoDB: ', err.message));

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(middlewares.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;
