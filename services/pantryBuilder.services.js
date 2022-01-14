const PantryBuilderItem = require("../models/pantryBuilderItem");


async function addPantryBuilderItem(data) {
    try {
      const newPantryBuilderItem = new PantryBuilderItem(data);
  
      const savePantryBuilderItems = await newPantryBuilderItem.save();
  
      if (savePantryBuilderItems) console.log("Add new pantry builder item successful!");
      else console.log("Add new pantry builder item fail!");
  
      return savePantryBuilderItems;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}

async function addPantryBuilderItemFromCart(data) {
  try {
    const saveUserPantryItems = await PantryBuilderItem.findOneAndUpdate(
      {id: data.id}, 
      {
        name: data.name,
        aisle: data.aisle,
        image: data.image
      }, 
      {upsert: true});

    if (saveUserPantryItems) console.log("Add new pantry builder item successful!");
    else console.log("Add new pantry builder item fail!");

    return saveUserPantryItems;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}


async function getPantryBuilderItems() {
    try {
        const pantryBuilderLists = await PantryBuilderItem.aggregate(
          [ { $sample: { size: 80 } } ]
       );
        
        if (pantryBuilderLists.length > 0) console.log("Get all pantry builder item successful!");
        else throw "Get all pantry builder item failed!";
        return pantryBuilderLists;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

async function searchIngredient(searchString) {
    try {
        const ingredients = await PantryBuilderItem.find({name: { $regex: searchString, $options: "i" }}).limit(3)
          .lean();
    
        if (ingredients.length == 0) {
          throw "Pantry buidler not found!";
        } else {
          console.log("Search pantry buidler success!");
        }
    
        return ingredients;
    } catch (error) {
        console.log(error);
        return null;
    }
}



module.exports = {
    addPantryBuilderItem,
    getPantryBuilderItems,
    searchIngredient,
    addPantryBuilderItemFromCart
}