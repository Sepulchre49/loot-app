const mongoose = require('mongoose');

const ReserveSchema = new mongoose.Schema({
    item: {
        type: Number,
        ref: "Item"
    },
    character: {
        type: String,
        ref: "Character"
    },
    modifier: {type: Number, default: 0},
    date: Date,
});

module.exports = mongoose.model("Reserve", ReserveSchema);