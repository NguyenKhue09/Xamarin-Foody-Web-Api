const { addRecipe } = require("../services/recipeServices/recipe.services");
const {
  addExtendedIngredient,
} = require("../services/recipeServices/extendedIngredients.services");
const {
  addAnalyzedInstruction,
} = require("../services/recipeServices/analyzedInstructions.services");
const { addNutrient } = require("../services/recipeServices/nutrient.services");

const factoryScript = async (datas) => {
  try {
    let trigger = await datas.results.map(async (data) => {
      if (data) {
        let recipeData = {
          vegetarian: data.vegetarian,
          vegan: data.vegan,
          id: data.id,
          title: data.title,
          image: data.image,
          readyInMinutes: data.readyInMinutes,
          cuisines: data.cuisines,
          dishTypes: data.dishTypes,
          diets: data.diets
        };

        let rep = await addRecipe(recipeData).then(async (recipe) => {
          if(recipe != null) {
            let extendedIngredientsResult = await data.extendedIngredients.map(
              async (e) => {
                let extendedIngredients = await addExtendedIngredient(
                  {
                    id: e.id,
                    aisle: e.aisle,
                    image: e.image,
                    name: e.name,
                    amount: e.amount,
                    unit: e.unit,
                  },
                  recipe._id
                );
  
                if (extendedIngredients) return true;
                else return false;
              }
            );
  
            let analyzedInstructionsLoop = await data.analyzedInstructions.map(
              async (a) => {
                let analyzedInstructions = await addAnalyzedInstruction(
                  {
                    name: a.name,
                    steps: a.steps,
                  },
                  recipe._id
                );
  
                if (analyzedInstructions) return true;
                else return false;
              }
            );
  
            let nutrientsResult = await data.nutrition.nutrients.map(
              async (n) => {
                let nutrients = await addNutrient(
                  {
                    name: n.name,
                    title: n.title,
                    amount: n.amount,
                    unit: n.unit,
                    percentOfDailyNeeds: n.percentOfDailyNeeds,
                  },
                  recipe._id
                );
  
                if (nutrients) return true;
                else return false;
              }
            );
  
            Promise.all([
              analyzedInstructionsLoop,
              nutrientsResult,
              extendedIngredientsResult,
            ]).then((res) => {
              let tabs = [false, false, false];
              if (extendedIngredientsResult[0]) tabs[0] = true;
              if (analyzedInstructionsLoop[0]) tabs[1] = true;
              if (nutrientsResult[0]) tabs[2] = true;
              return res;
            });
          }
        });
        if (rep) return true;
      }
    });

    return Promise.all(trigger).then((value) => console.log("Stop"));
  } catch (err) {
    throw err;
  }
};

module.exports = factoryScript;
