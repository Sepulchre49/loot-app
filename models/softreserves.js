module.exports = function(req, res, next) {
    let map = new Map();
    res.records.forEach(record => {
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