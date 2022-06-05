const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){ //TODO: Need to make sure that the recpies is not alredy esxist
    await DButils.execQuery(`insert into userfavrecpies values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipeid from userfavrecpies where user_id='${user_id}'`);
    return recipes_id;
}


async function createRecipe(user_id,recpiesDetials){ //TODO: Change recpiedDeitlas.id -> real id
    console.log(recpiesDetials);
    await DButils.execQuery(
        `INSERT INTO userrecipes VALUES ('${user_id}','${recpiesDetials.id}','${recpiesDetials.title}', '${recpiesDetials.readyInMinutes}', '${recpiesDetials.image}' , '${recpiesDetials.aggregateLikes}' , '${recpiesDetials.vegan}' , '${recpiesDetials.vegetarian}' , '${recpiesDetials.glutenFree}' , '${recpiesDetials.ingredients}', '${recpiesDetials.instructions}', '${recpiesDetials.numOfDishes}')`
      );

}


exports.markAsFavorite = markAsFavorite;
exports.createRecipe = createRecipe;
exports.getFavoriteRecipes = getFavoriteRecipes;
