const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){ //TODO: Need to make sure that the recpies is not alredy esxist
    await DButils.execQuery(`insert into userfavrecpies values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipeid from userfavrecpies where user_id='${user_id}'`);
    return recipes_id;
}



exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
