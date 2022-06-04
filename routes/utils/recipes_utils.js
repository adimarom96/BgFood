const axios = require("axios");
const { response } = require("express");
const api_domain = "https://api.spoonacular.com/recipes";

/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info
 */

async function getRecipeInformation(recipe_id) {
  return await axios.get(`${api_domain}/${recipe_id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}

async function getRecipeDetails(recipe_id) {
  let recipe_info = await getRecipeInformation(recipe_id);
  let {
    id,
    title,
    readyInMinutes,
    image,
    aggregateLikes,
    vegan,
    vegetarian,
    glutenFree,
  } = recipe_info.data;

  return {
    id: id,
    title: title,
    readyInMinutes: readyInMinutes,
    image: image,
    popularity: aggregateLikes,
    vegan: vegan,
    vegetarian: vegetarian,
    glutenFree: glutenFree,
  };
}

async function getRandomRecipes() {
  const response = await axios.get(`${api_domain}/random`, {
    // this get/post
    params: {
      number: 3,
      apiKey: process.env.spooncular_apiKey,
    },
  });
  let prevRecips = extractPreviewRecipeDetails([response.data.recipes[0],response.data.recipes[1],response.data.recipes[2]]);// TODO: might return less then three, need to fix
  console.log(prevRecips);
  return response.prevRecips;
}

function extractPreviewRecipeDetails(recipes_info) {
  return recipes_info.map((recipe_info) => {
    //check the data type so it can work with diffrent types of data
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

async function getRecipesPreview(strIds) {
  let recipes_ids_list = strIds.split(",");
  let promises = [];
  recipes_ids_list.map((id) => {
    promises.push(getRecipeInformation(id));
  });
  let info_res = await Promise.all(promises);
  //info_res.map((recp)=>{console.log(recp.data)});
  // console.log(info_res);
  let prevRecips = extractPreviewRecipeDetails(info_res);
  console.log(prevRecips);
  return prevRecips;
}

// async function getRandomThreeRecipes() {
//    const response = await axios.get(`${api_domain}/random`,{
//        params{
//            number: 10,
//            apiKey:// ????
//        }
//    });
//    return response;
// }

exports.getRecipeDetails = getRecipeDetails;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipesPreview = getRecipesPreview;
