const mongoose = require("mongoose");

const SoftReserveSchema = new mongoose.Schema({
    lastUpdated: Date,
    reserves: {
        type: Map,
        of: Object // In Mongoose Maps, keys must be strings in order to store the document in MongoDB.
    }
});

module.exports = mongoose.model("SoftReserve", SoftReserveSchema);