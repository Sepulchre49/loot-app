const mongoose = require('mongoose');
const Item = require("../models/Item");
const Reserve = require('../models/Reserve');

module.exports = async function(req, res, next) {
    for (let record of res.records) {
        // Read one line of CSV data
        const { 
            Item: itemName, 
            ItemId: id, 
            From: boss, 
            Name: playerName, 
            Date: reserveDate 
        } = record;
        
        // Check if item is already in the DB
        try {
            let item = await Item.findOne({_id: id}).populate('reserves').exec();
            // Create the Item object if it wasn't found in the db
            if (!item) {
                item = new Item({
                    _id: id,
                    name: itemName,
                    source: boss
                });
            }
            let reserve;
            // Check to see if this player already has a modifier
            if (item.reserves.has(playerName)) {
                console.debug(`Updating modifier for ${playerName} on ${item.name}`);
                reserve = item.reserves.get(playerName);
                reserve.modifier += 20;
            } else {
                console.debug("Creating new reserve");
                // Create the Reserve object if it doesn't exist
                reserve = new Reserve({
                    item: item,
                    date: reserveDate
                });
            }
            // Update the item object
            item.reserves.set(playerName, reserve);
            // Save to db
            await item.save();
            await reserve.save();
        } catch (err) {
            console.error("Error performing database access:", err);
        }
    }

    next();
}