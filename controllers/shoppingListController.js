const {
    addShoppingListItem,
    getShoppingLists,
    deleteShoppingListItem,
    deleteManyShoppingListItem
} = require("../services/shoppingList.services");

exports.getShoppingListItem = async (req, res) => {
    try {
      const userId = req.params.userId;
      const result = await getShoppingLists(userId);
  
      if (result.length == 0) {
        return res.status(400).json({message: 'ShoppingList not found'});
      }
      return res.status(200).json({results: result});
    } catch (error) {
        return res.status(400).json({message: 'ShoppingList not found'});;
    }
};

exports.addShoppingListItem = async (req, res) => {
    try {
      
      const result = await addShoppingListItem(req.body);
  
      if (!result) {
        return res.status(400).json({message: 'Add shoppingListItem fail'});
      }
      return res.status(200).json({message: 'Add shoppingListItem success'});
    } catch (error) {
        return res.status(400).json({message: 'Add shoppingListItem fail'});
    }
};

exports.deleteShoppingListItem = async (req, res) => {
  try {
    
    const shoppingListId = req.params.id;
    const result = await deleteShoppingListItem(shoppingListId);

    if (!result) {
      return res.status(400).json({message: 'Delete shoppingListItem fail'});
    }
    return res.status(200).json({message: 'Delete shoppingListItem success'});
  } catch (error) {
      return res.status(400).json({message: 'Delete shoppingListItem fail'});
  }
};

exports.deleteManyShoppingListItem = async (req, res) => {
  try {
    
    const listId = req.body;
    const result = await deleteManyShoppingListItem(listId);

    if (!result) {
      return res.status(400).json({message: 'Delete many shoppingListItem fail'});
    }
    return res.status(200).json({message: 'Delete many shoppingListItem success'});
  } catch (error) {
      return res.status(400).json({message: 'Delete many shoppingListItem fail'});
  }
};