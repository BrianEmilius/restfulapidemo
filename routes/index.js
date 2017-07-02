const path = require('path');

module.exports = (app) => {
	require(path.join(__dirname, 'users'))(app);
	require(path.join(__dirname, 'articles'))(app);
};
