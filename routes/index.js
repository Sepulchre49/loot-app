const express = require('express');
const router = express.Router();
const sanitize = require('../controllers/sanitize');
const parse = require('../controllers/parse');
const updateReserves = require('../controllers/updateReserves');
const { validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/', [sanitize, parse, updateReserves] , (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(422).json({ err: err.array() });
    }
    res.redirect(reserves);
});

module.exports = router;