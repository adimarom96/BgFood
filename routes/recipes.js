var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));

//random
 router.get("/random", async (req, res, next) => { //TODO: for some resason its not return the answer at post man, just print it
  try {
    let random_3_recipes = await recipes_utils.getRandomRecipes();
    res.status(200).send(random_3_recipes);
  } catch (error) {
    next(error);
  }
});

//recipes/search TODO: change the swager!
router.get("/search", async (req, res, next) => { 
  try {
    let searchRecpies = await recipes_utils.searchRecpies(5,req.query.recipeskeywords);
    res.send(searchRecpies);
  } catch (error) {
    next(error);
  }
});

/**
* getpreviw - list of ides
* returns preview of all the id's recipe.
*/
router.get("/getRecipesPrev", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipesPreview(req.query.recpiesIds.split(","));
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * returns the full recipe match to the id it gets.
 */
router.get("/getFullRecipe", async (req, res, next) => {
  console.log("in /getFullRecipe in recipes.js");
  try {
    let id = req.query.recipe_id;
    const recipe = await recipes_utils.getRecipeDetails(id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
// DELETE this? why does it needed ????
router.get("/:recipeId", async (req, res, next) => {
  console.log("in /:recipeId in recipes.js");
  try {
    let id = req.params.recipeId;
    const recipe = await recipes_utils.getRecipeDetails(id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
