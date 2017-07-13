
const BasicStrategy = require('passport-http').BasicStrategy;
// const db = require('../config/mysql').connect();

module.exports = (app, passport) => {
	passport.use(new BasicStrategy((username, password, done) => {
		if (username.valueOf() === 'alfred' && password.valueOf() === '1234')
			return done(null, true);
		done(null, false);
	}));
};
