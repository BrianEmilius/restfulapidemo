// DEPENDENCIES
const restify = require('restify');

// uh, "not" variables?
const port = process.env.PORT || 1337;

// SERVER INITIALIZATION
const app = restify.createServer({
	'name': 'RESTful API Demo',
	'version': '0.0.1'
});

// CONFIGURATION
require('./config/server')(app);

// HELPERS / MIDDLEWARE
require('./helpers/redirect')(app);

// ROUTES
require('./routes/index')(app);

// LISTEN AND BEGIN
app.listen(port, () => {
	console.log('%s is listening on port %s', app.name, port);
});
