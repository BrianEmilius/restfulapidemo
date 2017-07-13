const path = require('path');

module.exports = (app, passport) => {
	require(path.join(__dirname, 'customers'))(app, passport);
	require(path.join(__dirname, 'films'))(app);
};
