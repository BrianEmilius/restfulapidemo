const mysql = require('mysql2');

module.exports = {
	'connect': () =>
		mysql.createConnection({
			'host': 'localhost',
			'user': 'root',
			'password': 'root',
			'database': 'sakila'
		})
};
