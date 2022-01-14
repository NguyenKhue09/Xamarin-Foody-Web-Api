const express = require('express');
const router = express.Router();


const {
    getPantryBuilder,
    addPantryBuilder,
    searchPantryBuilder
} = require('../controllers/pantryBuilderController');


router.route("/get-pantry-builder").get(getPantryBuilder);

router.route("/add-pantry-builder").get(addPantryBuilder);

router.route("/search-pantry-builder").get(searchPantryBuilder);

module.exports = router;