const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const DB_URI =
	process.env.NODE_ENV === 'test'
		? process.env.TEST_DB_URI
		: process.env.DB_URI;

module.exports = {
	PORT,
	DB_URI,
	SECRET,
};
