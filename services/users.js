const path = require('path');
const mysql = require(path.join(__dirname, '..', 'config', 'mysql'));
const db = mysql.connect();

/**
 * Handles users
 * @class
 */
class User {
    /**
     * Find a single user and send user object to callback function
     * @param {number} id the id of a user
     * @param {findOneCallback} next the callback function that handles the result
     */
    findOne(id, next) {
        try {
            db.execute('SELECT id, username FROM users WHERE id = ? LIMIT 1', [id], function(err, row) {
                if (err) throw new Error('SQL error');
                next(null, row[0]);
            });
        }
        catch(err) {
            next(err);
        }
    }
    /**
     * Callback function that handles the result of findOne()
     * @callback findOneCallback
     * @param {object} err either null or an error object
     * @param {object} row a json object containing user information
     */

    /**
     * Find all users and send the user object to callback function
     * @param {findAllCallback} next the callback function that handles the result
     */
    findAll(next) {
        try {
            db.execute('SELECT id, username FROM users', [], function(err, rows) {
                if (err) throw new Error('SQL error');
                next(null, rows);
            });
        }
        catch(err) {
            next(err);
        }
    }
    /**
     * Callback function that handles the result of findAll()
     * @callback findAllCallback
     * @param {object} err either null or an error object
     * @param {object} rows a json object containing user information
     */
}

module.exports = User;