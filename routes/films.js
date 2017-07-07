const Film = require('../services/films');

module.exports = (app) => {
	app.get('/films', (req, res) => {
		const film = new Film();
		film.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});

	app.get('/films/:id', (req, res) => {
		const film = new Film(req.params.id);
		film.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});
};
