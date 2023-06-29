const { parse } = require('csv-parse/sync');

module.exports = function (req, res, next) {
    const records = parse(req.body.softreserves, {
        columns: true
    });


    let map = new Map();
    records.forEach(record => {
        const { Item, ItemId, From, Name } = record;

        const value = {
            "name": Item,
            "boss": From,
            "reserves": [{"player": Name, "modifier": 0}]
        };

        if (!map.has(ItemId)) {
            map.set(ItemId, value);
        } else {
            let newVal = map.get(ItemId);
            newVal.reserves = [...newVal.reserves, {"player": Name, "modifier": 0}] 
        }

    });

    res.softreserves = map;
    next();
}