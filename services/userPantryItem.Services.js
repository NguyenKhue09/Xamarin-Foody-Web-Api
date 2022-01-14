const UserPantryItem = require("../models/userPantryItem");


async function addUserPantryItem(data) {
    try {
      //const newUserPantryItem = new UserPantryItem(data);
  
      //const saveUserPantryItems = await newUserPantryItem.save();

      const saveUserPantryItems = await UserPantryItem.updateOne(
          {userId: data.userId}, 
          {$addToSet: { itemId: {$each: data.itemId }}}, 
          {upsert: true});
  
      if (saveUserPantryItems) console.log("Add new user pantry item successful!");
      else console.log("Add new user pantry item fail!");
  
      return saveUserPantryItems;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}

async function getUserPantryItems(userId) {
    try {
        const userPantryLists = await UserPantryItem.findOne({userId})
        .populate({ path: 'itemId', select: '-__v' })
        .select("-_id -userId -__v").lean();
        
        if (userPantryLists) console.log("Get all user pantry items successful!");
        else throw "Get all user pantry items failed!";
        return userPantryLists;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

async function getUserPantryItemsName(userId) {
    try {
        // const userPantryLists = await UserPantryItem.findOne({userId})
        // .populate({ path: 'itemId', select: 'name -_id' })
        // .select("name").lean();

        const userPantryLists = await UserPantryItem.aggregate([
            {
                $match: {
                    "userId": userId
                }
            },
            {
                $project: {
                    "_id": 0,
                    "itemId": "$itemId"
                }
            },
            { 
                $lookup: {
                  from: "pantrybuilderitems", 
                  localField: "itemId", 
                  foreignField: "_id", 
                  as: 'itemId'
                } 
            },
            {
                $project: {
                    "itemId": {
                        $reduce: {
                            input: "$itemId",
                            initialValue: [],
                            in: { $concatArrays : ["$$value", ["$$this.name"]]}
                        }
                    }
                }
            }
        ])
        
        if (userPantryLists.length > 0) console.log("Get all user pantry items name successful!");
        else throw "Get all user pantry items name failed!";
        return userPantryLists[0].itemId;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}


async function deleteUserPantryItem(id, userId) {

    try {

        const result = await UserPantryItem.findOneAndUpdate({userId}, {$pull: {itemId: id}}, {new: true});


        if(result) {
            console.log("Delete user pantry item success!");
        } else {
            console.log("Delete user pantry item fail!");
        }
  
        return result;
    } catch (error) {
        console.log(error);
        console.log("Delete user pantry item fail!");
    }
    
}

async function deleteManyUserPantryItem(userId, listId) {
    try {
        const result = await UserPantryItem.findOneAndUpdate({userId}, {$pull: {itemId: {$in: listId}}}, {new: true});

        if(result) {
            console.log("Delete many user pantry item success!");
        } else {
            console.log("Delete many user pantry item fail!");
        }
  
        return result;
    } catch (error) {
      console.log("Delete many user pantry item fail!");
      console.log(error.message);
      return false;
    }
}

async function deleteAllUserPantryItem(userId) {

    try {
        const result = await UserPantryItem.findOneAndDelete({userId});

        if(result) {
            console.log("Delete all user pantry item success!");
        } else {
            console.log("Delete all user pantry item fail!");
        }
  
        return result;
    } catch (error) {
        console.log(error);
        console.log("Delete user pantry item fail!");
    }
    
}




module.exports = {
    addUserPantryItem,
    getUserPantryItems,
    deleteUserPantryItem,
    deleteManyUserPantryItem,
    deleteAllUserPantryItem,
    getUserPantryItemsName
}