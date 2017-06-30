const path = require('path');

module.exports = function(app) {
    require(path.join(__dirname, 'users'))(app);
    require(path.join(__dirname, 'articles'))(app);
};