const { ENVIRONMENT } = require("./config");

const info = (...params) => {
	if (ENVIRONMENT !== 'test') {
		console.log(...params);
	}
};

const error = (...params) => {
	if (ENVIRONMENT !== 'test') {
		console.error(...params);
	}
};

module.exports = {
	info,
	error,
};
