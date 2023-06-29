const express = require('express');
const app = express();
const index = require('./routes/index');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Config environment
dotenv.config();
const port = process.env.PORT || 3333;

// Connect to db
(async () => {
    await mongoose.connect(process.env.ATLAS_URI);
})()
    .then(() => console.log("Successfully connected to database!"))
    .catch(err => console.log(err));

// Set up middleware and view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Routing middleware
app.use('/', index);

// Start app
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
