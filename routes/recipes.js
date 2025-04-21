const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipes/recipes.js");

const createRecipesRoutes = (app) => {
  app.get("/recipes", async (req, res) => {
    const recipes = await getRecipes();
    res.send(recipes);
  });

  app.get("/recipe/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await getRecipeById(id);
    res.send(recipe);
  });

  app.put("/recipe", async (req, res) => {
    const recipe = req.body;
    const result = await createRecipe(recipe);
    res.send(result);
  });

  app.patch("/recipe/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = req.body;
    const result = await updateRecipe(id, recipe);
    res.send(result);
  });

  app.delete("/recipe/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteRecipe(id);
    res.send(result);
  });
};

module.exports = { createRecipesRoutes };
