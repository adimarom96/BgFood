var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));

/**
 * Random: return 3 random recipes from the server.
 */
router.get("/random", async (req, res, next) => {
  try {
    let user_id = req.session.user_id;
    let random_3_recipes = await recipes_utils.getRandomRecipes(user_id);
    res.status(200).send(random_3_recipes);
  } catch (error) {
    next(error);
  }
});

/**
 * Returns the last three observed by the user.
 */
router.get("/getLast3", async (req, res, next) => {
  console.log("in /getLast3 in recipes.js");
  try {
    const user_id = req.session.user_id;
    let recipes = await recipes_utils.getLast3(user_id);
    res.status(200).send(recipes);
  } catch (error) {
    next(error);
  }
});

/**
 * getPreview - list of ides
 * returns preview of all the id's recipe.
 */
router.get("/getRecipesPrev", async (req, res, next) => {
  try {
    const ids = req.query.recpiesIds.split(",");
    const user_id = req.session.user_id;
    const recipe = await recipes_utils.getRecipesPreview(ids, user_id);
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
    let user = req.session.user_id;
    const recipe = await recipes_utils.getRecipeDetails(id, user);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * recipes/search TODO: change the swager!
 */
router.get("/search", async (req, res, next) => {
  // if there is a logged IN user, then save his search, can use it in the front to show "the last search".
  if (req.session && req.session.user_id) {
    req.session.last_search = req.session.recipeskeywords;
  }

  num = req.query.num;
  if (!num) {
    num = 5; // defualt
  }
  word = req.query.recipeskeywords;
  //num = req.query.num;
  cuisine = req.query.cuisine;
  diet = req.query.diet;
  intolerances = req.query.intolerances;
  try {
    let searchRecpies = await recipes_utils.searchRecpies(
      num,
      word,
      cuisine,
      diet,
      intolerances
    );
    res.send(searchRecpies);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
