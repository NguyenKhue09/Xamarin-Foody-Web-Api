const mongoose = require("mongoose");

const nutrientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    percentOfDailyNeeds: {
        type: Number,
        required: true
    }
})

const NutrientSchema = mongoose.model("nutrient", nutrientSchema);

module.exports = NutrientSchema;