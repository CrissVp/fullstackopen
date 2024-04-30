const Subscriptions = (pubsub) => {
	return {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
		}
	};
};

module.exports = Subscriptions;
