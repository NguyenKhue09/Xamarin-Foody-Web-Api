const {
    addPantryBuilderItem,
    getPantryBuilderItems,
    searchIngredient
} = require("../services/pantryBuilder.services");

const {
    getIngredients
} = require("../services/ingredient.services");

exports.getPantryBuilder = async (req, res) => {
    try {
      
      const result = await getPantryBuilderItems();
  
      if (result.length == 0) {
        return res.status(400).json({message: 'PantryBuilder not found'});
      }
      return res.status(200).json({pantryBuilder: result});
    } catch (error) {
        return res.status(400).json({message: 'PantryBuilder not found'});;
    }
};

exports.addPantryBuilder = async (req, res) => {
    try {
        const ingredient = await getIngredients();
        ingredient.forEach(async (element) => {
            const newEle = {
                id: element.id,
                name: element.name,
                aisle: element.aisle,
                image: element.image
            };

            const result = await addPantryBuilderItem(newEle);
  
            if (!result) {
                console.log('Add pantry builder fail!');
            } else {
                console.log('Add pantry builder success!');
            }
            
        });
        return res.status(200).json({message: 'Add pantry builder success!'});
    } catch (error) {
        return res.status(400).json({message: 'Add pantry builder fail!'});
    }
};

exports.searchPantryBuilder = async (req, res) => {
    try {
      const searchString = req.query.query;

      const result = await searchIngredient(searchString);
  
      if (result.length == 0) {
        return res.status(400).json({message: 'Search PantryBuilder failed'});
      }
      return res.status(200).json({pantryBuilder: result});
    } catch (error) {
        return res.status(400).json({message: 'Search PantryBuilder failed'});;
    }
};