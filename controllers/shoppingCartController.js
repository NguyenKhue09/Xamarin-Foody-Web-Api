const {
    addShoppingCartItem,
    getShoppingCarts,
    deleteCartItem,
    deleteManyCartItem,
    deleteAllCartItem
} = require("../services/shoppingCart.services");

const {
  addUserPantryItem
} = require("../services/userPantryItem.Services");

const {
  addPantryBuilderItemFromCart
} = require("../services/pantryBuilder.services");

exports.getShoppingCartItem = async (req, res) => {
    try {
      const shoppingCartuserID = req.params.userID;
      const result = await getShoppingCarts(shoppingCartuserID);
  
      if (result.length == 0) {
        return res.status(400).json({message: 'ShoppingCart not found'});
      }
      return res.status(200).json({resultsCart: result});
    } catch (error) {
        return res.status(400).json({message: 'ShoppingCart not found'});;
    }
};

exports.addShoppingCartItem = async (req, res) => {
    try {
      
      const result = await addShoppingCartItem(req.body);
  
      if (!result) {
        return res.status(400).json({message: 'Add shoppingCartItem fail'});
      }
      return res.status(200).json({message: 'Add shoppingCartItem success'});
    } catch (error) {
        return res.status(400).json({message: 'Add shoppingCartItem fail'});
    }
};

exports.deleteShoppingCartItem = async (req, res) => {
  try {
    
    const shoppingCartId = req.params.id;
    const result = await deleteCartItem(shoppingCartId);

    if (!result) {
      return res.status(400).json({message: 'Delete shoppingCartItem fail '});
    }
    return res.status(200).json({message: 'Delete shoppingCartItem success '});
  } catch (error) {
      return res.status(400).json({message: 'Delete shoppingCartItem fail '});
  }
};

exports.AddShoppingCartItemToUserPantry = async (req, res) => {
  try {
    
    const shoppingCartuserID = req.params.userID;
    const results = await getShoppingCarts(shoppingCartuserID);

    if (results.length > 0) {
      results.forEach(async (ele) => {
        const newData = {
          id: ele.id,
          name: ele.name,
          aisle: ele.aisle,
          image: ele.image
        };

        const result = await addPantryBuilderItemFromCart(newData);
        if(result) {
          const addResult = await addUserPantryItem({userId: shoppingCartuserID, itemId: [result._id]})
          if(addResult) {
            console.log(addResult);
            console.log("Add cart to pantry success!")
          } else {
            console.log("Add cart to pantry fail!")
          }
        }
      });

      await deleteAllCartItem(shoppingCartuserID);
      
      return res.status(200).json({message: 'Add all shoppingCartItem to pantry success!'});
    } else {
      return res.status(400).json({message: 'Add all shoppingCartItem to pantry fail!'});
    }
   
  } catch (error) {
    return res.status(400).json({message: 'Add all shoppingCartItem to pantry fail!'});
  }
};