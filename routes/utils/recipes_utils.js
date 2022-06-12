const axios = require("axios");
const { response } = require("express");
const api_domain = "https://api.spoonacular.com/recipes";
const MySql = require("MySql");
const DButils = require("../utils/DButils");
const user_utils = require("./user_utils");

/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info
 */

/**
 * @param {*} recipe_id
 * @returns full information about the recipe with this id.
 */
async function getRecipeInformation(recipe_id) {
  console.log("in getRecipeInformation in recipes_utills.js");
  return await axios.get(`${api_domain}/${recipe_id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}

/**
 * @param {*} recipe_id 
 * @returns put all tha data from the server in local var and returns it.
 */
async function getRecipeDetails(recipe_id) {
  let recipe_info = await getRecipeInformation(recipe_id);
  let {
    id,
    title,
    image,
    imageType,
    servings,
    readyInMinutes,
    license,
    sourceName, sourceUrl, spoonacularSourceUrl,
    aggregateLikes,
    healthScore, spoonacularScore, pricePerServing,
    analyzedInstructions, cheap, creditsText, cuisines,
    dairyFree, diets, gaps,
    glutenFree,
    instructions, ketogenic, lowFodmap, occasions,
    sustainable,
    vegan,
    vegetarian,
    veryHealthy, veryPopular, whole30,
    weightWatcherSmartPoints,
    dishTypes,
    extendedIngredients,
    summary, winePairing,
  } = recipe_info.data;

  return {
    id: id,
    title: title,
    image: image,
    imageType: imageType,
    servings: servings,
    readyInMinutes: readyInMinutes,
    license: license,
    sourceName: sourceName,
    sourceUrl: sourceUrl,
    spoonacularSourceUrl: spoonacularSourceUrl,
    popularity: aggregateLikes,
    healthScore: healthScore,
    spoonacularScore: spoonacularScore,
    pricePerServing: pricePerServing,
    analyzedInstructions: analyzedInstructions,
    cheap: cheap,
    creditsText: creditsText,
    cuisines: cuisines,
    dairyFree: dairyFree,
    diets: diets,
    gaps: gaps,
    glutenFree: glutenFree,
    instructions: instructions,
    ketogenic: ketogenic,
    lowFodmap: lowFodmap,
    occasions: occasions,
    sustainable: sustainable,
    vegan: vegan,
    vegetarian: vegetarian,
    veryHealthy: veryHealthy,
    veryPopular: veryPopular,
    whole30: whole30,
    weightWatcherSmartPoints: weightWatcherSmartPoints,
    dishTypes: dishTypes,
    extendedIngredients: extendedIngredients,
    summary: summary,
    winePairing: winePairing,
  };
}

/**
 * 
 * @returns 3 random recipes from the server.
 */
async function getRandomRecipes() {
  const response = await axios.get(`${api_domain}/random`, {
    // this get/post
    params: {
      number: 3,
      apiKey: process.env.spooncular_apiKey,
    },
  });
  let previewRecips = extractPreviewRecipeDetails([
    response.data.recipes[0],
    response.data.recipes[1],
    response.data.recipes[2],
  ]); // TODO: might return less then three, need to fix - ????
  console.log(previewRecips);
  return previewRecips;
  //return response.prevRecips;// wrong!
}

/**
 * 
 * @param {*} recipes_info 
 * @returns preview of all the rescipes in this list of ids.
 */
function extractPreviewRecipeDetails(recipes_info) {
  return recipes_info.map((recipe_info) => {
    //check the data type so it can work with diffrent types of data ??
    let data = recipe_info;
    if (recipe_info.data) {
      data = recipe_info.data;
    }
    const {
      id,
      title,
      readyInMinutes,
      image,
      aggregateLikes,
      vegan,
      vegetarian,
      glutenFree,
    } = data;
    return {
      id: id,
      title: title,
      image: image,
      readyInMinutes: readyInMinutes,
      popularity: aggregateLikes,
      vegan: vegan,
      vegetarian: vegetarian,
      glutenFree: glutenFree,
    };
  });
}

/**
 * 
 * @param {*} numOfResult : how many reslut do i want to return to my search.
 * @param {*} queryToSearch : the word/term/food i want to find.
 * @param {*} cuisine : list to filter by.
 * @param {*} diet : list to filter by.
 * @param {*} intolarence : list to filter by.
 * @returns 
 */
async function searchRecpies(numOfResult, queryToSearch, cuisine, diet, intolerances) {
  //https://spoonacular.com/food-api/docs#Search-Recipes-Complex
  //TODO: need to makesure that all recpies have instracution, amonut of recpies return, filter\order and etc. check hw3 pdf
  const response = await axios.get(`${api_domain}/complexSearch`, {
    // this get/post
    params: {
      query: queryToSearch,
      number: numOfResult,
      cuisine: cuisine,
      diet: diet,
      intolerances: intolerances,
      apiKey: process.env.spooncular_apiKey,
    },
  });

  let x = response.data.results;
  let ids = [];

  //go throw all ids.
  for (let i = 0; i < Object.keys(x).length; i++) {
    ids.push(x[i].id);
  }
  // call for get Recipes Preview.
  let fullR = getRecipesPreview(ids);
  return fullR; // the filtring will take place in the frontend

  /** example:
   * fullR:=:  "id": 654812,"title": "Pasta and Seafood", "image": "https://spoonacular.com/recipeImages/654812-556x370.jpg",
        "readyInMinutes": 45,"popularity": 1,"vegan": false,"vegetarian": false,"glutenFree": false
   */
}

/**
 * @param {*} recipes_ids_list 
 * @returns preview of recipes
 * check also if the user have seen this recipe before, and if add it to his favorites.
 */
async function getRecipesPreview(recipes_ids_list,user_id) {
  let promises = [];
  recipes_ids_list.map((id) => {
    promises.push(getRecipeInformation(id));
  });
  let info_res = await Promise.all(promises);
  let recipe = extractPreviewRecipeDetails(info_res);
  // call for func that return if this user watched those recipes!
  let ids = recipes_ids_list;
  for (let i = 0; i < Object.keys(ids).length; i++) {
    const f = await user_utils.checkSeen(user_id, ids[i]);
    if (f[0] == null) {
      recipe[i]["seen"] = false;
    }
    else {
      recipe[i]["seen"] = true;
    }
  }

  // call for func that check if this user saved those recipes to favorites. 
  const f = await user_utils.getFavoriteRecipes(user_id);
  for (let i = 0; i < Object.keys(ids).length; i++) {
    for (let j = 0; j < Object.keys(f).length; j++) {
      // if this recipe is in favList then add true as favorite.
      if (f[j].recipeid == ids[i]) {
        recipe[i]["favorite"] = true;
        break;
      }
    }
  }
  // for each recipe that doesn't gets the true, now will get the false.
  for (let i = 0; i < Object.keys(ids).length; i++) {
    if (recipe[i]["favorite"] != true) {
      recipe[i]["favorite"] = false;
    }
  }
  console.log("get preview: ", recipe);
  return recipe;
}

// return 3 last seen recipes of this user.
async function getLast3(user_id) {
  let threeLast = [];
  //const user_id = req.session.user_id;
  // go to DB table "lastSeen" -> user_id,recipe_id,date-> filter all recipeID of this user_id-> order by date-> take the newest 3.
  let x = await DButils.execQuery(
    `SELECT * FROM hw3.lastseen where user_id='${user_id}' ORDER BY date DESC LIMIT 3`
  );
  for (let i = 0; i < Object.keys(x).length; i++) {
    threeLast.push(x[i].recipe_id)
  }
  let prev3 = getRecipesPreview(threeLast);
  return prev3;
}

exports.getRecipeDetails = getRecipeDetails;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipesPreview = getRecipesPreview;
exports.searchRecpies = searchRecpies;
exports.getLast3 = getLast3;