const https = require("https");
const keyContext = require("./keyContext");
require("dotenv").config(); // to use .env file

const {
    getRecipesId
} = require("../services/recipeServices/recipe.services");

const {
    updateRecipe
} = require("../services/recipeServices/recipe.services");

const timeRecipe = async (req, res, next) => {
  //   console.log(keyContext);
  let count = 0;
  let APIKEY = process.env.APIKEY;
  let data;

  let APIKEYS = [
    "d4f6a096b4064572b40753a497fcd5f7",
    "797e2e5e05fd4ca4ba02035cd5ff46f4",
    "b09a9af733064beeb82c70406b565918",
    "757a905978594ef086e312509e14e747",
    "654a09cc5b3549ab9d6442ccd23f9ef3",
    "fb0553d9de4949eb9494d7a43de9f60c",
    "e8096985f30b45bf8e3212115a218cc5",
    "8742b6ff28af45379a5f06320dba113b",
    "409407cdfa02474f8e61e7f643a7dbec",
    "660b4f774a724fdda7ea5f4c927c0a9e",
    "062bd78944304f6fa86954cad474c6e9",
    "85e55bb723d44cffbbfcccd99a68225d",
    "ef20217a3df647f8ae51ed4271f68858"
  ];
  
  const recipeId = await getRecipesId();

  recipeId.forEach( async (ele) => {
      
      if(!ele.readyInMinutes) {
        console.log(count++);
          try {
        let trigger = await https.get(
        `https://api.spoonacular.com/recipes/${ele.id}/information?apiKey=${APIKEY}`,
        (res) => {
            let rawData = [];

            res.on("data", (chunk) => {
            rawData.push(chunk);
            });

            res.on("end", async() => {
            data = JSON.parse(Buffer.concat(rawData).toString());
            console.log("This is raw data", data);

            if(data.code == 402) {
                //APIKEY = APIKEYS[Math.floor(Math.random()*APIKEYS.length)];
                console.log(APIKEY);
            } 
                
                const result = await updateRecipe(ele.id, data.readyInMinutes);
                console.log(data.readyInMinutes);
                if(result) {
                    console.log("Update ok");
                } else {
                    console.log("Update failed");
                }
            

            });
      }
    );

    } catch (err) {
        console.log(err.message)
        throw err;
    }
      } 
    
  });
  return res.status(200).json({ message: "OK" });

};

module.exports = timeRecipe;
