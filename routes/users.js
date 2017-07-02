const User = require('../services/users');

module.exports = (app) => {
	app.post('/users', (req, res) => {
		const user = new User();
		user.create(req.body)
			.then((result) => {
				req.params.id = result.insertId;
				res.send(201, req.params);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});

	app.get('/users', (req, res) => {
		const user = new User();
		user.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});

	app.get('/users/:username', (req, res) => {
		const user = new User(req.params.username);
		user.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});

	app.patch('/users/:username', (req, res) => {
		const user = new User(req.params.username);
		user.patch(req.body)
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});

	app.del('/users/:username', (req, res) => {
		const user = new User(req.params.username);
		user.delete()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});
};
