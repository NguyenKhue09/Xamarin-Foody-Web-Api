const express = require('express');
const router = express.Router();

const {
    addUserPantryItem,
    getUserPantryItems,
    deleteUserPantryItem,
    deleteManyUserPantryItem,
    deleteAllUserPantryItem,
} = require('../controllers/userPantryController');

router.route("/get-user-pantry-item/:userID").get(getUserPantryItems);

router.route("/add-user-pantry-item").post(addUserPantryItem);

router.route("/delete-user-pantry-item/:userId/:id").delete(deleteUserPantryItem);

router.route("/delete-many-user-pantry-item/:userId").post(deleteManyUserPantryItem);

router.route("/delete-all-user-pantry-item/:userId").delete(deleteAllUserPantryItem);

module.exports = router;