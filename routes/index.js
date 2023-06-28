const express = require('express');
const router = express.Router();
const validate = require('../controllers/validate');

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/', validate, (req, res) => {
    res.render('upload.ejs');
});

module.exports = router;