const { parse } = require('csv-parse/sync');

module.exports = function (req, res, next) {
    res.records = parse(req.body.softreserves, {
        columns: true
    });

    next();
}