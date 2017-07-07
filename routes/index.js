const path = require('path');

module.exports = (app) => {
	require(path.join(__dirname, 'customers'))(app);
	require(path.join(__dirname, 'films'))(app);
};
