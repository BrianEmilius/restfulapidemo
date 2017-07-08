const db = require('../config/mysql').connect();

/**
 * Handles customers
 * @class
 */
class Customer {
	/**
	 * Creates an instance of Customer.
	 * @param {number} [id] the unique id of a customer
	 * @memberof Customer
	 */
	constructor (id) {
		if (typeof id !== 'undefined') {
			this.id = parseInt(id);
		}
	}
	
	/**
	 * Create a customer in the database.
	 * @param {object} values JSON formatted object containing
	 * the customer values with which to handle a query
	 * @memberof Customer
	 */
	post (values) {
		return new Promise((resolve, reject) => {
			if (typeof values === 'object') {
				this.values = values;
				db.execute('INSERT INTO users SET username = ?, email = ?, password = ?',
					[values.id, values.email, values.password], (err, row) => {
						if (err) reject(err);
						resolve(row);
					});
			} else {
				reject(new Error('Missing or bad set of values'));
			}
		});
	}

	/**
	 * Get customers from the database.
	 * @memberof Customer
	 */
	get () {
		if (typeof this.id === 'number') {
			const id = this.id;
			return new Promise((resolve, reject) => {
				db.execute(`SELECT ID, name, address, \`zip code\`, phone, city, country, 
				            notes, SID FROM customer_list WHERE ID = ?`,
					[id], (err, row) => {
						if (err) reject(err);
						resolve(row);
					});
			});
		} else {
			return new Promise((resolve, reject) => {
				db.execute(`SELECT ID, name, address, \`zip code\`, phone, city, country,
				            notes, SID FROM customer_list`, (err, rows) => {
						if (err) reject(err);
						resolve(rows);
					});
			});
		}
	}

	/**
	 * Update a customer in the database.
	 * @param {object} values JSON formatted object containing
	 * the customer values with which to handle a query
	 * @memberof Customer
	 */
	patch (values) {
		const id = this.id;
		return new Promise((resolve, reject) => {
			if (typeof values === 'object') {
				const SQLarray = [];
				for (const key in values) {
					SQLarray.push(`${key} = '${values[key]}'`);
				}
				db.execute(`UPDATE users SET ${SQLarray.toString()} WHERE username = ?`,
					[id], (err, row) => {
						if (err) reject(err);
						resolve(row);
					});
			} else {
				reject(new Error('Missing or bad set of values'));
			}
		});
	}

	/**
	 * Delete a customer from the database
	 * @memberof Customer
	 */
	delete () {
		const id = this.id;
		return new Promise((resolve, reject) => {
			db.execute('DELETE FROM customer WHERE ID = ?', [id], (err, row) => {
				if (err) reject(err);
				resolve(row);
			});
		});
	}

	/**
	 * Get full payment history of a customer
	 * @memberof Customer
	 */
	payments () {
		const id = this.id;
		return new Promise((resolve, reject) => {
			db.execute(`SELECT payment_id, customer_id, staff_id, rental_id, amount, payment_date,
			            last_update FROM sakila.payment WHERE customer_id = ?`,
				[id], (err, rows) => {
					if (err) reject(err);
					resolve(rows);
				});
		});
	}
}

module.exports = Customer;
