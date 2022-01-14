const Ingredient = require("../models/ingredient");

async function addIngredient(data) {
    try {
      const newIngredient = new Ingredient(data);
  
      const saveIngredient = await newIngredient.save();
  
      if (saveIngredient) console.log("Add new ingredient successful!");
      else console.log("Add new ingredient fail!");
  
      return saveIngredient;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}

async function getIngredients() {
  try {
    const ingredients = await Ingredient.find({}).lean();
    if (ingredients.length > 0) console.log("Get all ingredient successful!");
    else console.log("Get all ingredient failed!");
    return ingredients
  } catch (error) {
    console.log(error.message);
    console.log("Get all ingredient failed!");
    return [];
  }
}

async function searchIngredient(searchString) {
    try {
        // const ingredients = await Ingredient.find({ $text: { $search: searchString } }).limit(3)
        //   .lean();
        const ingredients = await Ingredient.find({name: { $regex: searchString, $options: "i" }}).limit(3)
          .lean();
    
        if (ingredients.length == 0) {
          throw "Ingredient not found!";
        } else {
          console.log("Search ingredient success!");
        }
    
        return ingredients;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function addManyIngredient(data) {
  try {
    const newIngredient = new Ingredient(data);

    const saveIngredient = await newIngredient.save();

    if (saveIngredient) console.log("Add new ingredient successful!");
    else console.log("Add new ingredient fail!");

    return saveIngredient;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}


module.exports = {
    addIngredient,
    searchIngredient,
    getIngredients,
    addManyIngredient
}