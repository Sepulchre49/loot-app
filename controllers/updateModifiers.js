const SoftReserve = require("../models/SoftReserve");

module.exports = async function(req, res, next) {
    try {
        // Fetch modifiers from db
        let cursor = await SoftReserve.findOne().exec();

        // If db query returned no results, we need to create a new SoftReserve object
        if (cursor.length == 0) {
            console.debug("Database was empty, creating empty SoftReserve object");
            cursor = new SoftReserve({
                date: Date.now(),
                reserves: new Map()
            });
        }
        // Calculate modifiers and update reserve map
        res.records.forEach(record => {
            const { Item, ItemId, From, Name } = record;

            // Item has not been reserved before
            if (!cursor.reserves.has(ItemId)) {
                cursor.reserves.set(ItemId, {
                    "name": Item,
                    "boss": From,
                    "reserves": [{"player": Name, "modifier": 0}]
                });
            } else {
                const currItem = cursor.reserves.get(ItemId);
                const i = currItem.reserves.findIndex(res => res.player == Name);
                if (i != -1) {
                    currItem.reserves[i].modifier += 20;
                    cursor.reserves.set(ItemId, currItem);
                } else {
                    currItem.reserves = [...currItem.reserves, {"player": Name, "modifier": 0}];
                }
            }
        });
        // Update database
        await cursor.save(); // Todo: this is not actually updating the database, even tho the returned document has the updated modifier values. Need to fix
        // Pass the reserve map along the the view layer
        res.softreserves = cursor.reserves;

    } catch (err) {
        console.error("Error reading or writing to database", err);
    } finally {
        next();
    }
}