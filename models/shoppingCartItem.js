const mongoose = require("mongoose");

const shoppingCartItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    userID: {
        type: String,
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

const ShoppingCartItem = mongoose.model("shoppingCartItem", shoppingCartItemSchema);

module.exports = ShoppingCartItem;