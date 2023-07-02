const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().populate('reserves').exec();
        console.log(items);
        res.render('items', {items: items});
    } catch (err) {
        console.error("Error rendering the reserves:", err);
    }
});

module.exports = router;