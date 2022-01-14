const anaInc = require("../../models/recipeModel/analyzedInstructions")


async function addAnalyzedInstruction(data, recipeId) {
    try {
        const newAnaInc = new anaInc(data);
     
      const saveAnaInc = await newAnaInc.save().then(async (result) => {
        await addAnalyzedInstructionToRecipe(recipeId, result._id);
        if (result) console.log("Add new anaInc successful!");
        else console.log("Add new anaInc fail!");
        return result;
      });
  
      return saveAnaInc;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}


module.exports = {
    addAnalyzedInstruction
}

const {addAnalyzedInstructionToRecipe} = require("./recipe.services")