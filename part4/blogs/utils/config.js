const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const ENVIRONMENT = process.env.NODE_ENV;
const DB_URI =
	ENVIRONMENT === 'test' ? process.env.TEST_DB_URI : process.env.DB_URI;

module.exports = {
	PORT,
	DB_URI,
	SECRET,
	ENVIRONMENT
};
