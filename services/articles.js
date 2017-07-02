const db = require('../config/mysql').connect();

class Article {

	constructor(id, values) {
		this.id = id;
		this.values = values;
	}

	create() {
		let values = this.values;
		return new Promise(function(resolve, reject) {
			db.execute('INSERT INTO articles SET title = ?, author_fk = ?, body = ?', [values.title, values.author, values.body], function(err, row) {
				if (err) reject(err);
				resolve(row);
			});
		});
	}

	getAll() {
		return new Promise(function(resolve, reject) {
			db.execute('SELECT id, title, author_fk, body FROM articles', function(err, rows) {
				if (err) reject(err);
				resolve(rows);
			});
		});
	}
}

module.exports = Article;
