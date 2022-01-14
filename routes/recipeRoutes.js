const express = require('express');
const router = express.Router();

const {
    getRecipes,
    searchRecipe,
    getRecipesByUserPantry,
    searchRecipeInPantry,
    getMealPlanRecipe
} = require('../controllers/recipeController');


router.route("/get-recipe").get(getRecipes);

router.route("/get-meal-recipe").get(getMealPlanRecipe);

router.route("/get-recipe-by-user-pantry/:userId").get(getRecipesByUserPantry);

router.route("/search-recipe").get(searchRecipe);

router.route("/search-recipe-pantry").get(searchRecipeInPantry);

module.exports = router;