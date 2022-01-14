const Recipe = require("../../models/recipeModel/recipe");
const ExtendedIngredient = require("../../models/recipeModel/extendedIngredients");

async function addRecipe(data) {
  try {
    const newRecipe = new Recipe(data);

    const saveRecipe = await newRecipe.save();

    if (saveRecipe) console.log("Add new recipe successful!");
    else console.log("Add new recipe fail!");

    return saveRecipe;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getRecipes(number) {
  try {
    console.log("Get recipe call");
    const recipes = await Recipe.find({}).limit(50)
    .populate("extendedIngredients", "-_id")
    .populate("nutrition.nutrients", "-_id")
    .populate("analyzedInstructions", "-_id")
    .lean();

    if (recipes.length !=0) console.log("Get all recipe successful!");
    else console.log("Get all recipe failed!");
    return recipes;
  } catch(error) {
    console.log(error);
    return [];
  }
   
}

async function getMealPlanRecipe(dishTypes) {
  try {
    console.log("Get recipe call");
    const recipes = await Recipe.aggregate([
        { $match: {
          "dishTypes": {$in: [dishTypes]}
        }},
       { $sample: { size: 1 } },
       {
         $project: {
           "_id": 1
         }
       }
    ]);

    if (recipes.length !=0) console.log("Get meal plan recipe successful!");
    else console.log("Get meal plan recipe failed!");
    return recipes;
  } catch(error) {
    console.log(error);
    return [];
  }
   
}

async function addExtendedIngredientToRecipe(recipeId, ingredientId) {
    try {
      const addExtendedIngredient = await Recipe.updateOne(
        { _id: recipeId },
        { $push: { extendedIngredients: ingredientId } }
      );
  
      if (addExtendedIngredient) console.log("Add ingredient to recipe successful");
      else throw "Add ingredient to recipe failed";
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

async function addNutrientToRecipe(recipeId, nutrientId) {
    try {
      const addNutrient = await Recipe.updateOne(
        { _id: recipeId },
        { $push: { "nutrition.nutrients": nutrientId } }
      );
  
      if (addNutrient) console.log("Add nutrient to recipe successful");
      else throw "Add nutrient to recipe failed";
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

async function addAnalyzedInstructionToRecipe(recipeId, anaInsId) {
    try {
      const addAnalyzedInstruction = await Recipe.updateOne(
        { _id: recipeId },
        { $push: { analyzedInstructions: anaInsId } }
      );
  
      if (addAnalyzedInstruction) console.log("Add AnalyzedInstruction to recipe successful");
      else throw "Add AnalyzedInstruction to recipe failed";
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

async function searchRecipe(diets, dishTypes) {
  try {
    console.log("Get recipe call");
    // let recipes = await Recipe.find({diets: {$in: diets}, dishTypes: {$in: dishTypes}}).limit(50)
    // .populate("extendedIngredients", "-_id")
    // .populate("nutrition.nutrients", "-_id")
    // .populate("analyzedInstructions", "-_id")
    // .lean();

    let recipes = await Recipe.aggregate(
      [ 
        {
          $match: {
            "diets": {$in: diets},
            "dishTypes": {$in: dishTypes}
          }
        },
        { $limit : 50 },
        { 
          $lookup: {
            from: "extendedingredients", 
            localField: "extendedIngredients", 
            foreignField: "_id", 
            as: 'extendedIngredients'
          } 
        },
        { 
          $lookup: {
            from: "analyzedinstructions", 
            localField: "analyzedInstructions", 
            foreignField: "_id", 
            as: 'analyzedInstructions'
          } 
        },
        { 
          $lookup: {
            from: "nutrients", 
            localField: "nutrition.nutrients", 
            foreignField: "_id", 
            as: 'nutrition.nutrients'
          } 
        },
      ]
    );

    if (recipes.length !=0) {
      console.log("Get search recipes successful!");
    }
    else {
      console.log("Get search recipes failed!. We change to get ramdom recipes!"); 
      recipes = await Recipe.aggregate(
        [ 
          { $sample: { size: 50 } },
          { 
            $lookup: {
              from: "extendedingredients", 
              localField: "extendedIngredients", 
              foreignField: "_id", 
              as: 'extendedIngredients'
            } 
          },
          { 
            $lookup: {
              from: "analyzedinstructions", 
              localField: "analyzedInstructions", 
              foreignField: "_id", 
              as: 'analyzedInstructions'
            } 
          },
          { 
            $lookup: {
              from: "nutrients", 
              localField: "nutrition.nutrients", 
              foreignField: "_id", 
              as: 'nutrition.nutrients'
            } 
          },
        ]
      );
    }
    return recipes;
  } catch(error) {
    console.log(error);
    return [];
  }
}

async function searchRecipeInPantry(query, cuisine, intolerances) {
  //console.log(query);
  const newIntolerances = intolerances.map(element => new RegExp(`\\b${element}\\b`, 'gi'));
  //console.log(newIntolerances);

  try {
    
    let pipline = [
      
    ];

    if(query != "") {
      //console.log("query");
      pipline.push({
        $match: { 
          "title": { $regex: query, $options: "i" }  
        }
      });
    }
    

    if(cuisine.length > 0) {
      //console.log("cuisine");
      pipline.push({
        $match: {
          "cuisines": {$in: cuisine}
        }
      })
    }

   
    pipline = [ ...pipline, ...[
      { 
        $lookup: {
          from: "extendedingredients", 
          localField: "extendedIngredients", 
          foreignField: "_id", 
          as: 'extendedIngredients'
        } 
      },
      { 
        $lookup: {
          from: "analyzedinstructions", 
          localField: "analyzedInstructions", 
          foreignField: "_id", 
          as: 'analyzedInstructions'
        } 
      },
      { 
        $lookup: {
          from: "nutrients", 
          localField: "nutrition.nutrients", 
          foreignField: "_id", 
          as: 'nutrition.nutrients'
        } 
      },

    ]];
    
    if(intolerances.length > 0) {
      //console.log("intolerances");
      pipline.push({
          $match: { 
            "extendedIngredients.name": {$nin: newIntolerances},
          }
        })
    }

    //console.log(pipline);

    const recipes = await Recipe.aggregate(pipline).limit(50);

    if (recipes.length !=0) console.log("Get search pantry recipes successful!");
    else console.log("Get search pantry recipes failed!");
    return recipes;
  } catch(error) {
    console.log(error);
    return [];
  }
}

async function getRecipesByUserPantry(pantryNameList) {
  try {
    const recipes = await Recipe.aggregate([
      { 
        $lookup: {
          from: "extendedingredients", 
          localField: "extendedIngredients", 
          foreignField: "_id", 
          as: 'extendedIngredients'
        } 
      },
      { 
        $match: { 
          "extendedIngredients.name": {$in: pantryNameList} 
        }
      },
      { 
        $lookup: {
          from: "analyzedinstructions", 
          localField: "analyzedInstructions", 
          foreignField: "_id", 
          as: 'analyzedInstructions'
        } 
      },
      { 
        $lookup: {
          from: "nutrients", 
          localField: "nutrition.nutrients", 
          foreignField: "_id", 
          as: 'nutrition.nutrients'
        } 
      },
    ]).limit(50)

    // const recipes = await Recipe.aggregate().lookup({
    //   from: "extendedingredients",
    //   localField: "extendedIngredients", 
    //   foreignField: "_id",
    //   as: 'extendedIngredients'
    // })

    if (recipes.length !=0) console.log("Get all recipe successful!");
    else console.log("Get all recipe failed!");
    return recipes;
  } catch(error) {
    console.log(error);
    return [];
  }
   
}


async function getRecipesId() {
  try {
    console.log("Get recipe call");
    const recipes = await Recipe.find({})
    .select("id readyInMinutes -_id")
    .lean();

    if (recipes.length !=0) console.log("Get all recipeId successful!");
    else console.log("Get all recipeId failed!");
    return recipes;
  } catch(error) {
    console.log(error);
    return [];
  }
   
}

async function updateRecipe(id, time) {
  try {
    
    const recipes = await Recipe.findOneAndUpdate({id}, {readyInMinutes: time})

    if (recipes) console.log("Update recipe successful!");
    else console.log("Update recipe failed!");
    return recipes;
  } catch(error) {
    console.log(error);
    return null;
  }
   
}

module.exports = {
    addRecipe,
    addExtendedIngredientToRecipe,
    addNutrientToRecipe,
    addAnalyzedInstructionToRecipe,
    getRecipes,
    getMealPlanRecipe,
    searchRecipe,
    searchRecipeInPantry,
    getRecipesByUserPantry,
    getRecipesId,
    updateRecipe
};
  