const axios = require("axios");
const { response } = require("express");
const api_domain = "https://api.spoonacular.com/recipes";
const MySql = require("MySql");
const DButils = require("../utils/DButils");
/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info
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
  let prevRecips = extractPreviewRecipeDetails([
    response.data.recipes[0],
    response.data.recipes[1],
    response.data.recipes[2],
  ]); // TODO: might return less then three, need to fix
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

async function searchRecpies(numOfResult, queryToSearch,cuisine,diet,intolarence) {
  //https://spoonacular.com/food-api/docs#Search-Recipes-Complex
  //TODO: need to makesure that all recpies have instracution, amonut of recpies return, filter\order and etc. check hw3 pdf
  const response = await axios.get(`${api_domain}/complexSearch`, {
    // this get/post
    params: {
      query: queryToSearch,
      number: numOfResult,
      cuisine: cuisine,
      diet:diet,
      intolarences:intolarence,
      apiKey: process.env.spooncular_apiKey,
    },
  });
  let x = response.data;
  //go throw all id, and then ask for the full/previw recipe.

  // call for getRecipesPreview

  return response.data;
}

async function getRecipesPreview(recipes_ids_list) {
  let promises = [];
  recipes_ids_list.map((id) => {
    promises.push(getRecipeInformation(id));
  });
  let info_res = await Promise.all(promises);
  let prevRecips = extractPreviewRecipeDetails(info_res);
  console.log(prevRecips);
  return prevRecips;
}

exports.getRecipeDetails = getRecipeDetails;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipesPreview = getRecipesPreview;
exports.searchRecpies = searchRecpies;