const mongoose = require("mongoose");

const shoppingListItemSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
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

const ShoppingListItem = mongoose.model("shoppingListItem", shoppingListItemSchema);

module.exports = ShoppingListItem;