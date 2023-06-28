const validator = require('express-validator');

module.exports = function (req, res, next) {
    validator.body("softreserves", "Invalid CSV data").isLength({min: 1}).isAlpha();
    console.log("Validated!");
    next();
}