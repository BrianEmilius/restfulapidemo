const db = require('../config/mysql').connect();

/**
 * Handles films
 * @class
 */
class Film {
	/**
	 * Creates an instance of Film.
	 * @param {number} [id] the unique id of a film
	 * @memberof Film
	 */
	constructor (id) {
		if (typeof id !== 'undefined') {
			this.id = parseInt(id);
		}
	}

	/**
	 * Get films from the database.
	 * @memberof Film
	 */
	get () {
		if (typeof this.id === 'number') {
			const id = this.id;
			return new Promise((resolve, reject) => {
				db.execute(`SELECT FID, title, description, category, price, length, rating, 
				            actors FROM film_list WHERE FID = ?`,
					[id], (err, row) => {
						if (err) reject(err);
						resolve(row);
					});
			});
		} else {
			return new Promise((resolve, reject) => {
				db.execute(`SELECT FID, title, description, category, price, length, rating, 
				            actors FROM film_list`, (err, rows) => {
						if (err) reject(err);
						resolve(rows);
					});
			});
		}
	}
}

module.exports = Film;
