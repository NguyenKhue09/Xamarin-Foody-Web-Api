const ShoppingCartItem = require("../models/shoppingCartItem");


async function addShoppingCartItem(data) {
    try {
      const saveShoppingCartItems = await ShoppingCartItem.create(data);
  
      console.log(saveShoppingCartItems);
      if (saveShoppingCartItems) console.log("Add new shopping cart items successful!");
      else console.log("Add new shopping cart items fail!");
  
      return saveShoppingCartItems;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}

async function getShoppingCarts(userID) {
    try {
      const shoppingCarts = await ShoppingCartItem.find({ userID: userID }).lean();
      
      if (shoppingCarts.length > 0) console.log("Get all recipe successful!");
      else throw "Get all recipe failed!";
      return shoppingCarts;
    } catch(error) {
      console.log(error.message);
      return null;
    }
}

async function deleteCartItem(id) {
  try{

    const result = await ShoppingCartItem.findByIdAndRemove(id);

    if(result) {
        console.log("Delete shopping cart item success!");
    } else {
        console.log("Delete shopping cart item fail!");
    }
  
    return result;
  }  catch (error) {
    console.log(error.message);
    return null;
  }
}


async function deleteAllCartItem(userId) {
  try{

    const result = await ShoppingCartItem.deleteMany({userId});

    console.log(result);
    if(result) {
        console.log("Delete shopping cart item success!");
    } else {
        console.log("Delete shopping cart item fail!");
    }
  
    return result;
  }  catch (error) {
    console.log(error.message);
    return null;
  }
}



module.exports = {
    addShoppingCartItem,
    getShoppingCarts,
    deleteCartItem,
    deleteAllCartItem
}