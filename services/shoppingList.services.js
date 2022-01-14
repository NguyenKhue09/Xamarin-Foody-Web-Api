const ShoppingListItem = require("../models/shoppingListItem");


async function addShoppingListItem(data) {
  try {
    //const newShoppingListItem = new ShoppingListItem(data);

    const saveShoppingListItems = await ShoppingListItem.create(data);

    console.log(saveShoppingListItems);
    if (saveShoppingListItems) console.log("Add new shopping list item successful!");
    else console.log("Add new shopping list item fail!");

    return saveShoppingListItems;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getShoppingLists(userId) {
  try {
    const shoppingLists = await ShoppingListItem.find({userId}).lean();

    if (shoppingLists.length > 0) console.log("Get all user shopping list item successful!");
    else throw "Get all user shopping list item failed!";
    return shoppingLists;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteShoppingListItem(id) {
    try {
      const result = await ShoppingListItem.findByIdAndRemove(id);

      if(result) {
          console.log("Delete shopping list item success!");
      } else {
          console.log("Delete shopping list item fail!");
      }
      return result;
    } catch (error) {
      console.log("Delete shopping list item fail!");
      console.log(error.message);
      return null;
    }
}

async function deleteManyShoppingListItem(listId) {
  try {
    const result = await ShoppingListItem.deleteMany({_id: {$in: listId}});

    console.log(result);
    if(result.deletedCount > 0) {
        console.log("Delete many shopping list item success!");
        return true;
    } else {  
        console.log("Delete many shopping list item fail!");
        return false;
    }
  } catch (error) {
    console.log("Delete many shopping list item fail!");
    console.log(error.message);
    return false;
  }
}




module.exports = {
  addShoppingListItem,
  getShoppingLists,
  deleteShoppingListItem,
  deleteManyShoppingListItem
}