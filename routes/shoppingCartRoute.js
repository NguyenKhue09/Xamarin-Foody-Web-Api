const express = require('express');
const router = express.Router();

const {
    getShoppingCartItem,
    addShoppingCartItem,
    deleteShoppingCartItem,
    AddShoppingCartItemToUserPantry
} = require('../controllers/shoppingCartController');

router.route("/get-shopping-cart-item/:userID").get(getShoppingCartItem);

router.route("/add-shopping-cart-item").post(addShoppingCartItem);

router.route("/delete-shopping-cart-item/:id").delete(deleteShoppingCartItem);

router.route("/add-shopping-cart-item-to-user-pantry/:userID").get(AddShoppingCartItemToUserPantry);

module.exports = router;