module.exports = function(app) {
	app.use(function(req, res, next) {
		res.redirect = function(addr) {
			res.header('Location', addr);
			res.send(302);
		}
		next();
	});
};