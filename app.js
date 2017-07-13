// DEPENDENCIES
const restify = require('restify');
const passport = require('passport');

// GENERAL SETTINGS STUFF
const port = process.env.PORT || 1337;

// SERVER INITIALIZATION
const app = restify.createServer({
	'name': 'RESTful API Demo',
	'version': '0.0.1'
});

// CONFIGURATION
require('./config/passport')(app, passport);
require('./config/server')(app, passport);

// HELPERS / CUSTOM MIDDLEWARE
require('./helpers/index')(app);

// ROUTES
require('./routes/index')(app, passport);

// LISTEN AND BEGIN
app.listen(port);
