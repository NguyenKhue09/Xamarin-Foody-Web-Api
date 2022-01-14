const mongoose = require("mongoose");

const pantryBuilderItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    aisle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const PantryBuilderItem = mongoose.model("pantryBuilderItem", pantryBuilderItemSchema);

module.exports = PantryBuilderItem;