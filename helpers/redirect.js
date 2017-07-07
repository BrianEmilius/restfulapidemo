module.exports = (app) => {
	app.use((req, res, next) => {
		res.redirect = (addr) => {
			res.header('Location', addr);
			res.send(302);
		};
		next();
	});
};
