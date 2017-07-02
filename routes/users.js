const User = require('../services/users');

module.exports = app => {
    
    app.post('/users', (req, res, next) => {
        let user = new User();
        user.create(req.body)
            .then(result => {
                req.params.id = result.insertId;
                res.send(201, req.params);
            })
            .catch(err => {
                res.send(400, {"code": "BadRequest", "message": err.message});
            });
        delete user;
    });

    app.get('/users', (req, res, next) => {
        let user = new User();
        user.get()
            .then(result => {
                res.send(200, result);
            })
            .catch(err => {
                console.error(err.message);
                res.send(404, {"code": "NotFound", "message": err.message});
            });
        delete user;
    });

    app.get('/users/:userId', (req, res, next) => {
        let user = new User(req.params.userId);
        user.get()
            .then(result => {
                res.send(200, result);
            })
            .catch(err => {
                res.send(404, {"code": "NotFound", "message": err.message});
            });
        delete user;
    });

    app.put('/users/:userId', (req, res, next) => {
        let user = new User(req.params.userId);
        user.put(req.body)
            .then(result => {
                res.send(200, result);
            })
            .catch(err => {
                res.send(400, {"code": "BadRequest", "message": err.message});
            });
    });

};

// GARBAGE COLLECTION
delete User;
