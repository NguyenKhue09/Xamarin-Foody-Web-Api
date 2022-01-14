const mongoose = require('mongoose');


const extendedIngredientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Ingredient must have id"]
    },
    aisle: {
        type: String,
        required: true
    },
    image: {
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
    }
})

const ExtendedIngredient = mongoose.model("extendedIngredient", extendedIngredientSchema);

module.exports = ExtendedIngredient;