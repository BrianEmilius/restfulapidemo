const restify       = require('restify');
const logger        = require('morgan');

module.exports = (app, passport) => {
	app.use(logger('dev'));
	app.use(restify.acceptParser(app.acceptable));
	app.use(restify.queryParser());
	app.use(restify.bodyParser());
	app.use(passport.initialize());
};
