const Article = require('../services/articles');

module.exports = (app) => {
	app.post('/articles', (req, res) => {
		const article = new Article(null, req.params);
		article.create()
			.then((result) => {
				req.params.id = result.insertId;
				res.send(201, req.params);
			})
			.catch((err) => {
				res.send(400, { 'code': 'BadRequest', 'message': err.message });
			});
	});
	
	app.get('/articles', (req, res) => {
		const article = new Article();
		article.getAll()
			.then((result) => {
				res.send(200, result);
			})
			.catch((err) => {
				res.send(404, { 'code': 'NotFound', 'message': err.message });
			});
	});
};
