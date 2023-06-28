const express = require('express');
const app = express();
const ejs = require('ejs');
const index = require('./routes/index');
const validate = require('./controllers/validate');

const port = process.env.PORT || 3333;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', index);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
