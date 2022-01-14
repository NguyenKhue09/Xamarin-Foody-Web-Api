const UserMealPlan = require("../models/userMealPlan");


async function addMealPlanRecipe(data) {

    try {

      console.log(data);

      let update = {};

      if(data.breakfastRecipe) {
        update = {
          breakfastRecipe: data.breakfastRecipe,
        }
      }

      if(data.lunchRecipe) {
        update = {
          ...update,
          lunchRecipe: data.lunchRecipe,
        }
      }

      if(data.dinnerRecipe) {
        update = {
          ...update,
          dinnerRecipe: data.dinnerRecipe
        }
      }

    

      const saveMealPlanRecipe = await UserMealPlan.updateOne(
          {userId: data.userId},
          update,
          {
              upsert: true
          }
        );
  
      if (saveMealPlanRecipe) console.log("Add new mealplan recipe successful!");
      else console.log("Add new mealplan recipe fail!");
  
      return saveMealPlanRecipe;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}

async function getMealPlanRecipes(userId) {
    try {
      console.log("Get recipe call");
      const recipes = await UserMealPlan.findOne({userId})
      .populate({
        path : 'breakfastRecipe',
        populate : [
            {
                path : 'extendedIngredients',
                select: "-_id"
            },
            {
                path : 'nutrition.nutrients',
                select: "-_id"
            },
            {
                path : 'analyzedInstructions',
                select: "-_id"
            }

        ]
      })
      .populate({
        path : 'lunchRecipe',
        populate : [
            {
                path : 'extendedIngredients',
                select: "-_id"
            },
            {
                path : 'nutrition.nutrients',
                select: "-_id"
            },
            {
                path : 'analyzedInstructions',
                select: "-_id"
            }

        ]
      })
      .populate({
        path : 'dinnerRecipe',
        populate : [
            {
                path : 'extendedIngredients',
                select: "-_id"
            },
            {
                path : 'nutrition.nutrients',
                select: "-_id"
            },
            {
                path : 'analyzedInstructions',
                select: "-_id"
            }

        ]
      })
      .lean();
  
      if (recipes.length !=0) console.log("Get user mealplan recipe successful!");
      else console.log("Get user mealplan recipe failed!");
      return recipes;
    } catch(error) {
      console.log(error);
      return null;
    }
}

async function deleteMealPlanRecipe(userId, type) {

  try {
    let update = {};

    if(type === "breakfast") {
      update = {
        $unset:{"breakfastRecipe":1}
      }
    } else if(type === "lunch") {
      update = {
        $unset:{"lunchRecipe":1}
      }
    } else if(type === "dinner") {
      update = {
        $unset:{"dinnerRecipe":1}
      }
    } else if(type === "all") {
      update = {
        $unset: {"breakfastRecipe": 1, "lunchRecipe": 1 , "dinnerRecipe": 1}
      }
    } else {
      throw "Delete mealplan recipe fail!";
    }
    

    const deleteMealPlanRecipe = await UserMealPlan.updateOne({userId}, update);

    console.log(deleteMealPlanRecipe);
    if (deleteMealPlanRecipe.modifiedCount == 1) console.log("Delete mealplan recipe successful!");
    else throw "Delete mealplan recipe fail!";

    return deleteMealPlanRecipe;
  } catch (error) {
    console.log(error);
    return null;
  }
}




module.exports = {
    addMealPlanRecipe,
    getMealPlanRecipes,
    deleteMealPlanRecipe
}