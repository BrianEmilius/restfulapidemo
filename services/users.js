const db = require('../config/mysql').connect();

/**
 * Handles users
 * @class User
 */
class User {
    /**
     * Creates an instance of User.
     * @param {string} [username] the unique username of a user
     * @memberof User
     */
    constructor(username) {
        if (typeof username === 'string') {
            this.username = username;
        }
    }
    
    /**
     * Create a user in the database.
     * @param {object} values JSON formatted object containing the user values with which to handle a query
     * @memberof User
     */
    post(values) {
        return new Promise(function(resolve, reject) {
            if (typeof values === 'object') {
                this.values = values;
                db.execute('INSERT INTO users SET username = ?, email = ?, password = ?', [values.username, values.email, values.password], function(err, row) {
                    if (err) reject(err);
                    resolve(row);
                });
            }
            else {
                reject(new Error('Missing or bad set of values'));
            }
        });
    }

    /**
     * Get users from the database.
     * @memberof User
     */
    get() {
        if (typeof this.username === 'string') {
            let username = this.username;
            return new Promise(function(resolve, reject) {
                db.execute('SELECT id, username, email, password FROM users WHERE username = ?', [username], function(err, row) {
                    if (err) reject(err);
                    resolve(row);
                });
            });
        }
        else {
            return new Promise(function(resolve, reject) {
                db.execute('SELECT id, username, email, password FROM users', function(err, rows) {
                    if (err) reject(err);
                    resolve(rows);
                });
            });
        }
    }

    /**
     * Update a user in the database.
     * @param {object} values JSON formatted object containing the user values with which to handle a query
     * @memberof User
     */
    put(values) {
        let username = this.username;
        return new Promise(function(resolve, reject) {
            if (typeof values === 'object') {
                let SQLarray = [];
                for(let key in values) {
                    SQLarray.push(`${key} = '${values[key]}'`);
                }
                //SQLarray.shift();
                db.execute('UPDATE users SET '+SQLarray.toString()+' WHERE username = ?', [username], (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            }
            else {
                reject(new Error('Missing or bad set of values'));
            }
        });
    }
}

module.exports = User;

// GARBAGE COLLECTION
delete db;
