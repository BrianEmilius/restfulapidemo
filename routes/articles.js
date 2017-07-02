const Article = require('../services/articles');

module.exports = function(app) {

	app.post('/articles', function(req, res, next) {
		let article = new Article(null, req.params);
		article.create()
			.then(function(result) {
				req.params.id = result.insertId;
				res.send(201, req.params);
			})
			.catch(function(err) {
				res.send(400, {"code": "BadRequest", "message": err.message});
			});
	})
	
	app.get('/articles', function(req, res, next) {
		let article = new Article();
		article.getAll()
			.then(function(result) {
				res.send(200, result);
			})
			.catch(function(err) {
				res.send(404, {"code": "NotFound", "message": err.message});
			});
	});

};

// GARBAGE COLLECTION
delete Article;
