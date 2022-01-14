const {
    getRecipes,
    searchRecipe,
    getRecipesByUserPantry,
    searchRecipeInPantry,
    getMealPlanRecipe
} = require("../services/recipeServices/recipe.services");

const {
  getUserPantryItemsName
} = require("../services/userPantryItem.Services")


exports.getRecipes = async (req, res) => {
    try {
      
      const result = await getRecipes(1);
  
      if (result.length == 0) {
        return res.status(401).json({message: 'Recipes not found'});
      }
      return res.status(200).json({results: result});
    } catch (error) {
        return res.status(401).json({message: 'Recipes not found', error});;
    }
};

exports.getMealPlanRecipe = async (req, res) => {
  try {
    let dishTypes = "";
    if(req.query.type) dishTypes = req.query.type;

    const result = await getMealPlanRecipe(dishTypes);

    if (result.length == 0) {
      return res.status(400).json({message: 'MealRecipe not found'});
    }
    return res.status(200).json({results: result});
  } catch (error) {
      return res.status(400).json({message: 'MealRecipe not found', error});;
  }
};


exports.searchRecipe = async (req, res) => {
  try {
    
    let diets = [];
    
    if(req.query.diet) diets = req.query.diet.split(",");
    let dishTypes = [];
    if(req.query.type) dishTypes = req.query.type.split(",");

    const result = await searchRecipe(diets, dishTypes);

    if (result.length == 0) {
      return res.status(400).json({message: 'Recipes not found'});
    }
    return res.status(200).json({results: result});
  } catch (error) {
      return res.status(400).json({message: 'Recipes not found', error});;
  }
};

exports.searchRecipeInPantry = async (req, res) => {
  try {
    
    let query = "";
    let cuisines = [];
    let intolerances = [];
    if(req.query.query) query = req.query.query;
    if(req.query.cuisine) cuisines = req.query.cuisine.split(",");
    if(req.query.intolerances) intolerances = req.query.intolerances.split(",");

    const result = await searchRecipeInPantry(query, cuisines, intolerances);

    if (result.length == 0) {
      return res.status(400).json({message: 'PantryRecipes not found'});
    }
    return res.status(200).json({results: result});
  } catch (error) {
      console.log(error.message);
      return res.status(400).json({message: 'PantryRecipes not found'});;
  }
};

exports.getRecipesByUserPantry = async (req, res) => {
  try {
    
    const userId = req.params.userId;

    const nameList = await getUserPantryItemsName(userId);
    
    if(nameList) {
      const result = await getRecipesByUserPantry(nameList);

      if (result.length == 0) {
        return res.status(400).json({message: 'Recipes by user pantry not found'});
      }
      return res.status(200).json({results: result});
    } else {
      return res.status(400).json({message: 'Recipes by user pantry not found'});
    }
  } catch (error) {
      return res.status(400).json({message: 'Recipes by user pantry not found', error});;
  }
};