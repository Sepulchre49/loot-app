const express = require('express');
const app = express();
const index = require('./routes/index');
const items = require('./routes/items');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Config environment
dotenv.config();
const port = process.env.PORT || 3000;

// Set up middleware and view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({limit: "1mb", extended: true}));
// Routing middleware
app.use('/', index);
app.use('/items', items);

async function startApp() {
    // Connect to db
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("Successfully connected to database!");
    } catch (err) {
        return console.log(err);
    }
    // Start web server
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });
}

startApp();