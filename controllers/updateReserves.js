const mongoose = require('mongoose');
const Item = require("../models/Item");
const Reserve = require('../models/Reserve');
const Character = require('../models/Character');

module.exports = async function(req, res, next) {
    for (let record of res.records) {
        // Read one line of CSV data
        const { 
            Item: itemName, 
            ItemId: id, 
            From: boss, 
            Name: characterName, 
            Date: reserveDate 
        } = record;
        
        try {
            let fetchOps = [Item.findOne({_id: id}), Character.findOne({_id: characterName})];
            let [item, character] = await Promise.all(fetchOps);

            if (!item) {
                item = new Item({
                    _id: id,
                    name: itemName,
                    source: boss,
                    reserves: new Map()
                });
            }

            if (!character) {
                character = new Character({
                    _id: characterName,
                    activeReserves: []
                });
            }

            const reserve = new Reserve({
                item: item,
                character: character,
                modifier: item.reserves.has(character._id) ? item.reserves.get(character._id).modifier : 0,
                date: reserveDate
            })

            item.reserves.set(character._id, reserve);
            character.activeReserves.push(reserve);

            let saveOps = [item.save(), character.save(), reserve.save()];
            await Promise.all(saveOps);
        } catch (err) {
            console.error("Error updating modifiers:", err);
        }
    }
    
    next();
}