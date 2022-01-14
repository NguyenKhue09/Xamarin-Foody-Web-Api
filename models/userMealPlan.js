const mongoose = require("mongoose");
const Recipe = require("./recipeModel/recipe")

const userMealPlanSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    breakfastRecipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  Recipe
    },
    lunchRecipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  Recipe
    },
    dinnerRecipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  Recipe
    }
})

const userMealPlan = mongoose.model("userMealPlan", userMealPlanSchema);

module.exports = userMealPlan;