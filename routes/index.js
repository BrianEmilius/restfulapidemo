const path = require('path');

module.exports = function(server) {
    require(path.join(__dirname, 'users'))(server);
};