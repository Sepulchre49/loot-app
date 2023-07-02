const mongoose = require('mongoose');
const Reserve = require('./Reserve');

const ItemSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    source: String,
    reserves: {
        type: Map,
        of: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reserve"
        },
        default: new Map()
    }
});

module.exports = mongoose.model("Item", ItemSchema);