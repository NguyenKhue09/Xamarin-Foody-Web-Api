const {
    addMealPlanRecipe,
    getMealPlanRecipes,
    deleteMealPlanRecipe
} = require("../services/userMealPlan.services");


exports.getMealPlanRecipes = async (req, res) => {
    try {
      const userId = req.params.userId;
      const result = await getMealPlanRecipes(userId);
  
      if (!result) {
        return res.status(400).json({message: 'Meal Plan Recipes not found'});
      }
      return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({message: 'Meal Plan Recipes not found'});;
    }
};

exports.addMealPlanRecipe = async (req, res) => {
    try {
     
      const result = await addMealPlanRecipe(req.body);
  
      if (!result) {
        return res.status(400).json({message: 'Add Meal Plan Recipes fail'});
      }
      return res.status(200).json({message: 'Add Meal Plan Recipes success'});
    } catch (error) {
        return res.status(400).json({message: 'Add Meal Plan Recipes fail'});;
    }
};

exports.deleteMealPlanRecipe = async (req, res) => {
  try {
    const userId = req.params.userId;
    const type = req.params.type;
    const result = await deleteMealPlanRecipe(userId, type);

    if (result.modifiedCount == 0) {
      return res.status(400).json({message: 'Delete Meal Plan Recipes fail'});
    } else {
      return res.status(200).json({message: 'Delete Meal Plan Recipes success'});
    }
    
  } catch (error) {
      return res.status(400).json({message: 'Delete Meal Plan Recipes fail'});
  }
};