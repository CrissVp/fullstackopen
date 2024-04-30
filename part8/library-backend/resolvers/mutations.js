const { GraphQLError } = require('graphql');
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const Mutations = (pubsub) => {
	return {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError('Not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				});
			}

			let author = await Author.findOne({ name: args.author });

			if (!author) {
				try {
					const newAuthor = new Author({ name: args.author });
					author = await newAuthor.save();
				} catch (error) {
					throw new GraphQLError('Saving author failed', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: { name: args.author },
							error
						}
					});
				}
			}

			const newBook = new Book({
				title: args.title,
				published: args.published,
				genres: args.genres,
				author: author
			});

			try {
				await newBook.save();
				author.bookCount = author.bookCount ? author.bookCount + 1 : 1;
				await author.save();
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: { title: args.title },
						error
					}
				});
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
			return newBook;
		},
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError('Not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				});
			}

			const author = await Author.findOne({ name: args.name });
			if (!author) return null;

			author.born = args.setBornTo;
			return author.save();
		},
		createUser: async (root, args) => {
			const user = new User(args);
			return user.save().catch((error) => {
				throw new GraphQLError('Creating user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: { username: args.username },
						error
					}
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('Wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				});
			}

			const useForToken = {
				username: user.username,
				id: user._id
			};

			return { value: jwt.sign(useForToken, process.env.JWT_SECRET) };
		}
	};
};

module.exports = Mutations;
