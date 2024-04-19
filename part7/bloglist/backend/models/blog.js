const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	author: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [
		new mongoose.Schema({
			content: String
		})
	]
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.comments = returnedObject.comments?.map((comment) => ({
			id: comment._id,
			content: comment.content
		}));

		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
