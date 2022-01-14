const exIng = require("../../models/recipeModel/extendedIngredients")


async function addExtendedIngredient(data, recipeId) {
    try {
        const newExIng = new exIng(data);
     
      const saveExIng = await newExIng.save().then(async (result) => {
        await addExtendedIngredientToRecipe(recipeId, result._id);
        if (result) console.log("Add new ExIng successful!");
        else console.log("Add new ExIng successful!");
        return result;
      });
  
      return saveExIng;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}

async function getExtendedIngredient() {
  try {
  
    const ingredients = await exIng.find({})
    .lean();

    if (ingredients.length !=0) console.log("Get all ingredients successful!");
    else console.log("Get all ingredients failed!");
    return ingredients;
  } catch(error) {
    console.log(error);
    return [];
  }
}

module.exports = {
    addExtendedIngredient,
    getExtendedIngredient
}

const {addExtendedIngredientToRecipe} = require("./recipe.services");