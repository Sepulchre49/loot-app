const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Reserve = require('../models/Reserve');

router.get('/', async (req, res) => {
    try {
        const bosses = await Item.aggregate([
            { 
                $group: { 
                    _id: "$source", 
                    items: { $push: "$$ROOT" }
                }
            }
        ]);
        let reserves = await Reserve.populate(bosses, {path: "items.reserves.$*"})
        res.render('loot-sheet', {data: reserves});
    } catch (err) {
        console.error("Error rendering the reserves:", err);
    }
});

module.exports = router;