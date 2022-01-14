const https = require("https");
const keyContext = require("./keyContext");
require("dotenv").config(); // to use .env file

const factoryScript = require("./factoryScript");

const complexSearch = async (req, res, next) => {
  //   console.log(keyContext);
  let number = parseInt(process.env.number);
  let APIKEY = process.env.APIKEY;
  let data;
  let i = 0;

  try {
    let trigger = await https.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=${number}&apiKey=${APIKEY}&addRecipesInformation=true&fillIngredients=true&addRecipeNutrition=true&type=marinade&diet=ketogenic`,
      (res) => {
        let rawData = [];

        res.on("data", (chunk) => {
          rawData.push(chunk);
        });

        res.on("end", () => {
          data = JSON.parse(Buffer.concat(rawData).toString());
          console.log("This is raw data", data);

          // function here
          if (data && data.results) {
            factoryScript(data);
            return true;
          }

          //throw "Failed";
        });
      }
    );

    return res.status(200).json({ message: "OK" });
  } catch (err) {
    throw err;
  }
};

module.exports = complexSearch;
