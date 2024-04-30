const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 5
	},
	favoriteGenre: {
		type: String
	}
});

const User = mongoose.model('User', schema);
module.exports = User;
