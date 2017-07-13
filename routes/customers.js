const Customer = require('../services/customers');

module.exports = (app, passport) => {
	app.post('/customers', passport.authenticate('basic', { 'session': false }), (req, res) => {
		const customer = new Customer();
		customer.create(req.body)
			.then((result) => {
				req.params.id = result.insertId;
				res.send(201, req.params);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});

	app.get('/customers', passport.authenticate('basic', { 'session': false }), (req, res) => {
		const customer = new Customer();
		customer.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});

	app.get('/customers/:id', passport.authenticate('basic', { 'session': false }), (req, res) => {
		const customer = new Customer(req.params.id);
		customer.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});

	app.patch('/customers/:id',
		passport.authenticate('basic', { 'session': false }), (req, res) => {
			const customer = new Customer(req.params.id);
			customer.patch(req.body)
				.then((result) => {
					res.send(200, result);
				})
				.catch((err) => {
					res.send(400, { 'code': 'BadRequest', 'message': err.message });
				});
		});

	app.del('/customers/:id', passport.authenticate('basic', { 'session': false }), (req, res) => {
		const customer = new Customer(req.params.id);
		customer.delete()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});

	app.get('/customers/:id/payments', passport.authenticate('basic', { 'session': false }),
		(req, res) => {
			const customer = new Customer(req.params.id);
			customer.payments()
				.then((result) => {
					res.send(200, result);
				})
				.catch((err) => {
					res.send(400, { 'code': 'BadRequest', 'message': err.message });
				});
		});

	app.get('/customers/:id/payments/:paymentId',
		passport.authenticate('basic', { 'session': false }), (req, res) => {
			const customer = new Customer(req.params.id);
			customer.payments(req.params.paymentId)
				.then((result) => {
					res.send(200, result);
				})
				.catch((err) => {
					res.send(400, { 'code': 'BadRequest', 'message': err.message });
				});
		});
};
