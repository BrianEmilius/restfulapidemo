const restify = require('restify');
const logger = require('morgan');

module.exports = function(app) {
	app.use(logger('dev'));
	app.use(restify.acceptParser(app.acceptable));
	app.use(restify.queryParser());
	app.use(restify.bodyParser());
};
