const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/mysql').connect();

module.exports = (passport) => {
	passport.use(new LocalStrategy((username, password, done) => {
		db.execute('SELECT staff_id, password FROM staff WHERE username = ?',
			[username], (err, row) => {
				if (err)
					return done(err);
				if (!row)
					return done(null, false, { 'message': 'Incorrect username' });
				if (!row[0].validPassword(password))
					return done(null, false, { 'message': 'Incorrect username' });
				return done(null, row);
			});
	}));
};
