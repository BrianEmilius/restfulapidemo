const restify = require('restify');
const logger  = require('morgan');
const path    = require('path');
const port    = process.env.PORT || 8080;

// SERVER DEFINITION
const server = restify.createServer({
	name: 'RESTful API Demo',
	version: '1.0.0'
});

// SERVER CONFIG
server.use(restify.plugins.acceptParser(server.acceptable))
	  .use(restify.plugins.queryParser())
	  .use(restify.plugins.bodyParser())
	  .use(logger('dev'));

// ROUTES
require(path.join(__dirname, 'routes', 'index'))(server);

// LISTEN AND BEGIN
server.listen(port, function(){
	console.info('%s is listening on %s', server.name, port);
});