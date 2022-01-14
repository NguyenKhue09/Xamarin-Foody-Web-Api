require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbconnect");

const app = express();

// route
const complexSearch = require("./functions/fetchScript");

app.use(express.json());

connectDB();   

const PORT = process.env.PORT || 5000;

app.use("/api/recipes", require("./routes/recipeRoutes"));

app.use("/api/shopping-list", require("./routes/shoppingListRoute"));

app.use("/api/pantry-builder", require("./routes/pantryBuilderRoute"));

app.use("/api/pantry", require("./routes/userPantryItemRoute"));

app.use("/api/shopping-cart", require("./routes/shoppingCartRoute"));

app.use("/api/ingredient", require("./routes/ingredientRoute"));

app.use("/api/meal-plan", require("./routes/userMealPlanRoute"));

app.get("/recipes/complexSearch", complexSearch);

app.get("/recipes/recipeIds", require("./functions/fetchTimeRecipe"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
