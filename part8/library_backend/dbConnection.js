const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;
mongoose.set('strictQuery', false);

const connectDb = () => {
	return mongoose
		.connect(DB_URI)
		.then((connection) => {
			console.log('Connected to MongoDB');
			return connection;
		})
		.catch((error) => console.log('Error connecting to MongoDB: ', error.message));
};

module.exports = { connectDb };
