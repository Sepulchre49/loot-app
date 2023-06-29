const { parse } = require('csv-parse/sync');

module.exports = function (req, res, next) {
    res.records = parse(req.body.softreserves, {
        columns: true
    });
    res.records.forEach(reserve => {
        // Send data to DB
    });
    next();
}