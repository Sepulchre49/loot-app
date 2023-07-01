const mongoose = require('mongoose');

const ReserveSchema = new mongoose.Schema({
    item: {
        type: Number,
        ref: "Item"
    },
    modifier: {type: Number, default: 0},
    date: Date,
    isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model("Reserve", ReserveSchema);