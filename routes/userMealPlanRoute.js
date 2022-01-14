const express = require('express');
const router = express.Router();

const {
    addMealPlanRecipe,
    getMealPlanRecipes,
    deleteMealPlanRecipe
} = require('../controllers/userMealPlanController');

router.route("/get-user-meal-plan/:userId").get(getMealPlanRecipes);

router.route("/add-user-meal-plan").post(addMealPlanRecipe);

router.route("/delete-user-meal-plan/:userId/:type").delete(deleteMealPlanRecipe);

module.exports = router;