const express = require('express');
const router = express.Router();
const sanitize = require('../controllers/sanitize');
const parse = require('../controllers/parse');
const softreserves = require('../models/softreserves');
const { validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/', [sanitize, parse, softreserves] , (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(422).json({ err: err.array() });
    }
    res.render('reserves.ejs', { softreserves: res.softreserves });
});

module.exports = router;