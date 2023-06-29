const validator = require('express-validator');

module.exports = function (req, res, next) {
    validator.body().trim().escape();
    next();
}