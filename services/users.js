const mysql = require('../config/mysql');
const db    = mysql.connect();

/**
 * Handles users
 * @class User
 */
class User {
    /**
     * Creates an instance of User.
     * @param {string} [username] the unique username of a user
     * @param {object} [values] JSON or jsx formatted object containing the user values with which to handle a query
     * @memberof User
     */
    constructor(username, values) {
        if (typeof username === "string") {
            this.username = username;
        }
        if (typeof values === "object") {
            this.values = values;
        }
    }
    
    /**
     * Create a user in the database.
     * @memberof User
     */
    create() {
        let values = this.values;
        return new Promise(function(resolve, reject) {
            db.execute('INSERT INTO users SET username = ?, email = ?, password = ?', [values.username, values.email, values.password], function(err, row) {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    /**
     * Get all users from the database.
     * @memberof User
     */
    getAll() {
        return new Promise(function(resolve, reject) {
            db.execute('SELECT id, username, email, password FROM users', function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    /**
     * Get one user from the database.
     * @memberof User
     */
    getOne() {
        let username = this.username;
        return new Promise(function(resolve, reject) {
            db.execute('SELECT id, username, email, password FROM users WHERE username = ?', [username], function(err, row) {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = User;

// GARBAGE COLLECTION
delete mysql;
delete db;