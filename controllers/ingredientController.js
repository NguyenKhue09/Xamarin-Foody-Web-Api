const {
    addIngredient,
    searchIngredient,
    getIngredients,
    addManyIngredient
} = require("../services/ingredient.services");


const {
  getExtendedIngredient
} = require("../services/recipeServices/extendedIngredients.services");

exports.getIngredient = async (req, res) => {
    try {
      
      const result = await getIngredients();
  
      if (result.length == 0) {
        return res.status(400).json({message: 'Ingredient not found'});
      }
      return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({message: 'Ingredient not found'});;
    }
};

exports.addIngredient = async (req, res) => {
    try {
      const result = await addIngredient(req.body);
  
      if (!result) {
        return res.status(400).json({message: 'Add ingredient fail!'});
      }
      return res.status(200).json({message: 'Add ingredient success!'});
    } catch (error) {
        return res.status(400).json({message: 'Add ingredient fail!'});
    }
};

exports.searchIngredient = async (req, res) => {
  try {
    const searchString = req.query.query;

    const result = await searchIngredient(searchString);
    if (!result) {
      return res.status(400).json({message: 'Search ingredients fail!'});
    }
    return res.status(200).json({results: result});
  } catch (error) {
      return res.status(400).json({message: 'Search ingredients fail!'});
  }
};

exports.addManyIngredient = async (req, res) => {
  try {

    const ingreList = await getExtendedIngredient();

    ingreList.forEach(async (ele) => {

      const newIngre = {
        id: ele.id,
        name: ele.name,
        aisle: ele.aisle,
        amount: 1,
        image: ele.image,
        unit: ele.unit
      };

      const result = await addManyIngredient(newIngre);

      if (result) {
        console.log("Add new ingre success!");
      } else {
        console.log("Add new ingre fail!");
      }
    });
    console.log("Stop!");
    return res.status(200).json({message: 'Add all ingredient success!'});
  } catch (error) {
      console.log(error.message);
      return res.status(400).json({message: 'Add all ingredient fail!'});
  }
};