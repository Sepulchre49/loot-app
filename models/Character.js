const mongoose = require('mongoose');
const Reserve = require('./Reserve');

const CharacterSchema = new mongoose.Schema({
    _id: String,
    activeReserves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserve"
    }]
});

module.exports = mongoose.model('Character', CharacterSchema);