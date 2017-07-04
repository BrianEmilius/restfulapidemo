const Customer = require('../services/customers');

module.exports = (app) => {
	app.post('/customers', (req, res) => {
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

	app.get('/customers', (req, res) => {
		const customer = new Customer();
		customer.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});

	app.get('/customers/:id', (req, res) => {
		const customer = new Customer(req.params.id);
		customer.get()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});

	app.patch('/customers/:id', (req, res) => {
		const customer = new Customer(req.params.id);
		customer.patch(req.body)
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});

	app.del('/customers/:id', (req, res) => {
		const customer = new Customer(req.params.id);
		customer.delete()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});
};
