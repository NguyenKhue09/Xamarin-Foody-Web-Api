const mongoose = require("mongoose");
const extendedIngredient = require('./extendedIngredients');
const nutrient = require("./nutrient");
const analyzedInstruction = require("./analyzedInstructions");

const recipeSchema = new mongoose.Schema({
    vegetarian: {
        type: Boolean,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    },
    extendedIngredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  extendedIngredient
        }
    ],
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    readyInMinutes: {
        type: Number,
        required: true,
    },
    cuisines: [
        {
            type: String
        }
    ],
    dishTypes: [
        {
            type: String
        }
    ],
    diets: [
        {
            type: String
        }
    ],
    nutrition: {
        nutrients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:  nutrient
            }
        ]
    },
    analyzedInstructions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  analyzedInstruction
        }
    ]
})

const RecipeSchema = mongoose.model("recipe", recipeSchema);

module.exports = RecipeSchema;