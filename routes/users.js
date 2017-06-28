const User = require('../services/users');

module.exports = function(server) {
    server.get('/users', function(req, res, next) {
        let user = new User();
        user.findAll(function(err, results) {
            if (err) console.error(err);
            res.send(results);
        });
    });
    
    server.get('/users/:id', function(req, res, next) {
        let user = new User();
        user.findOne(req.params.id, function(err, result) {
            if (err) console.error(err);
            res.send(result);
        });
    });
};