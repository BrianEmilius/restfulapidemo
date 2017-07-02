const User = require('../services/users');

module.exports = function(app) {
    
    app.post('/users', function(req, res, next) {
        let user = new User();
        user.create(req.params)
            .then(function(result) {
                req.params.id = result.insertId;
                res.send(201, req.params);
            })
            .catch(function(err) {
                res.send(400, {"code": "BadRequest", "message": err.message});
            });
        delete user;
    });

    app.get('/users', function(req, res, next) {
        let user = new User();
        user.get()
            .then(function(result) {
                res.send(200, result);
            })
            .catch(function(err) {
                console.error(err.message);
                res.send(404, {"code": "NotFound", "message": err.message});
            });
        delete user;
    });

    app.get('/users/:username', function(req, res, next) {
        let user = new User(req.params.username);
        user.get()
            .then(function(result) {
                res.send(result);
            })
            .catch(function(err) {
                res.send(404, {"code": "NotFound", "message": err.message});
            });
        delete user;
    });

    app.put('/users/:username', function(req, res, next) {
        let user = new User(req.params.username);
    });

};

// GARBAGE COLLECTION
delete User;