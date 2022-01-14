const express = require('express');
const router = express.Router();


const {
    getIngredient,
    addIngredient,
    searchIngredient,
    addManyIngredient
} = require('../controllers/ingredientController');


router.route("/get-ingredient").get(getIngredient);

router.route("/add-ingredient").post(addIngredient);

router.route("/add-many-ingredient").get(addManyIngredient);

router.route("/search-ingredient").get(searchIngredient);

module.exports = router;