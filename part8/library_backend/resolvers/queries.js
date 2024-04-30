const Author = require('../models/author');
const Book = require('../models/book');

const Queries = {
	me: (root, args, { currentUser }) => currentUser,
	bookCount: async () => Book.collection.countDocuments(),
	authorCount: async () => Author.collection.countDocuments(),
	allBooks: async (root, args) => {
		if (args.author) {
			const savedBooks = await Book.find({}).populate({
				path: 'author',
				match: {
					name: args.author
				}
			});

			return savedBooks.filter((book) => book.author !== null);
		}

		if (args.genre) {
			return Book.find({ genres: { $all: [args.genre] } }).populate('author');
		}

		return Book.find({}).populate('author');
	},
	allAuthors: async () => {
		return Author.find({});
	}
};

module.exports = Queries;
