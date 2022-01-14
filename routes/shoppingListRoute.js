const express = require('express');
const router = express.Router();

const {
    getShoppingListItem,
    addShoppingListItem,
    deleteShoppingListItem,
    deleteManyShoppingListItem
} = require('../controllers/shoppingListController');

router.route("/get-shopping-list-item/:userId").get(getShoppingListItem);

router.route("/add-shopping-list-item").post(addShoppingListItem);

router.route("/delete-shopping-list-item/:id").delete(deleteShoppingListItem);

router.route("/delete-many-shopping-list-item").post(deleteManyShoppingListItem);

module.exports = router;