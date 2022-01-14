const nutrient = require("../../models/recipeModel/nutrient");

async function addNutrient(data, recipeId) {
  try {
    const newNutrient = new nutrient(data);

    const saveNutrient = await newNutrient.save().then(async (result) => {
      await addNutrientToRecipe(recipeId, result._id);
      if (result) console.log("Add new nutrient successful!");
      else console.log("Add new nutrient failed!");
      return result;
    });

    return saveNutrient;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = {
  addNutrient,
};

const { addNutrientToRecipe } = require("./recipe.services");
