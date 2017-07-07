// DEPENDENCIES
const restify = require('restify');

// GENERAL SETTINGS STUFF
const port = process.env.PORT || 1337;

// SERVER INITIALIZATION
const app = restify.createServer({
	'name': 'RESTful API Demo',
	'version': '0.0.1'
});

// CONFIGURATION
require('./config/server')(app);

// HELPERS / CUSTOM MIDDLEWARE
require('./helpers/index')(app);

// ROUTES
require('./routes/index')(app);

// LISTEN AND BEGIN
app.listen(port);
