const express = require('express');
const router = express.Router();
const sanitize = require('../controllers/sanitize');
const parse = require('../controllers/parse');
const { validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/', [sanitize, parse] , (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(422).json({ err: err.array() });
    }
    console.log(res.records);
    res.render('upload.ejs', { softreserves: res.records });
});

module.exports = router;