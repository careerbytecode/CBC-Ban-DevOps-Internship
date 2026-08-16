const recipeService = require("../services/recipe.service");

function getRecipes(req, res) {
  console.log("Recipe Controller reached");

  const recipes = recipeService.getRecipes();

  res.json({
    success: true,
    count: recipes.length,
    data: recipes,
  });
}

module.exports = {
  getRecipes,
};