const {
    addUserPantryItem,
    getUserPantryItems,
    deleteUserPantryItem,
    deleteManyUserPantryItem,
    deleteAllUserPantryItem,
} = require("../services/userPantryItem.Services");

exports.getUserPantryItems = async (req, res) => {
    try {
      const pantryUserID = req.params.userID;
      const result = await getUserPantryItems(pantryUserID);
  
      if (!result) {
        return res.status(400).json({message: 'Pantry Items not found'});
      }
      return res.status(200).json({pantryItems: result});
    } catch (error) {
        return res.status(400).json({message: 'Pantry Items not found'});;
    }
};

exports.addUserPantryItem = async (req, res) => {
    try {
      
      const result = await addUserPantryItem(req.body);
  
      if (!result) {
        return res.status(400).json({message: 'Add pantryItem fail'});
      }
      return res.status(200).json({message: 'Add pantryItem success'});
    } catch (error) {
        return res.status(400).json({message: 'Add pantryItem fail'});
    }
};

exports.deleteUserPantryItem = async (req, res) => {
  try {
    
    const pantryItemId = req.params.id;
    const userId = req.params.userId;
    const result = await deleteUserPantryItem(pantryItemId, userId);

    if (!result) {
      return res.status(400).json({message: 'Delete pantryItem fail '});
    }
    return res.status(200).json({message: 'Delete pantryItem success '});
  } catch (error) {
      return res.status(400).json({message: 'Delete pantryItem fail '});
  }
};

exports.deleteManyUserPantryItem = async (req, res) => {
  try {
    
    const userId = req.params.userId;
    const listId = req.body;

    const result = await deleteManyUserPantryItem(userId, listId);

    if (!result) {
      return res.status(400).json({message: 'Delete many pantryItem fail '});
    }
    return res.status(200).json({message: 'Delete many pantryItem success '});
  } catch (error) {
      return res.status(400).json({message: 'Delete many pantryItem fail '});
  }
};

exports.deleteAllUserPantryItem = async (req, res) => {
  try {
    
    const userId = req.params.userId;
    const result = await deleteAllUserPantryItem(userId);

    if (!result) {
      return res.status(400).json({message: 'Delete all pantryItem fail '});
    }
    return res.status(200).json({message: 'Delete all pantryItem success '});
  } catch (error) {
      return res.status(400).json({message: 'Delete all pantryItem fail '});
  }
};

