const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
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
    },
    unit: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    } 
})

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;