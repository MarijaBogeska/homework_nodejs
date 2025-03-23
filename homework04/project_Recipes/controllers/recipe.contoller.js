import RecipeService from "../services/recipe.service.js";

export default class RecipeController {
  constructor() {
    this.RecipeService = new RecipeService();
  }
  // GET ALL RECIPES
  async getRecipes(req, res) {
    try {
      const filter = {};
      // FILTERS
      if (req.query.difficulty) {
        filter.difficulty = req.query.difficulty;
      }
      if (req.query.category) {
        filter.category = req.query.category;
      }
      const allRecipes = await this.RecipeService.getAll(filter);
      if (allRecipes.length === 0) {
        return res.status(404).send({ message: `Recipes not found.` });
      }
      res.send(allRecipes);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // GET RECIPE BY ID
  async getRecipe(req, res) {
    try {
      const recipeId = req.params.id;
      const recipe = await this.RecipeService.getById(recipeId);
      if (!recipe) {
        return res.status(404).send({ message: `Recipe not found.` });
      }
      res.status(200).send(recipe);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  // CREATE NEW RECIPE
  async createRecipe(req, res) {
    try {
      const body = req.body;
      const newRecipe = await this.RecipeService.create(body);
      res.status(201).send(newRecipe);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  //UPDATE RECIPE BY ID
  async updateRecipe(req, res) {
    try {
      const recipeId = req.params.id;
      const {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficulty,
        isVegetarian,
        category,
      } = req.body;
      const recipeData = { updatedAt: new Date().toISOString() };
      for (const [key, value] of Object.entries({
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficulty,
        isVegetarian,
        category,
      })) {
        if (value) {
          recipeData[key] = value;
        }
      }
      const newRecipe = await this.RecipeService.update(recipeId, recipeData);
      if (!newRecipe) {
        return res.status(404).send({ message: "Recipe not found" });
      }
      res.send({ message: `Recipe updated successfully.` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  // GET VEGETARIAN RECIPES
  async getVegetarianRecipes(req, res) {
    try {
      const recipes = await this.RecipeService.getVegetarian();
      if (recipes.length === 0) {
        return res.status(404).send({ message: `Recipes not found.` });
      }
      res.send(recipes);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  // SEARCH RECIPES BY TITLE
  async searchRecipes(req, res) {
    try {
      const recipeTitle = req.query.title;
      const recipe = await this.RecipeService.searchRecipesByTitle(recipeTitle);
      if (recipe.length === 0) {
        return res.status(404).send({ message: `Recipe not found.` });
      }
      res.send(recipe);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  // DELETE RECIPE
  async delete(req, res) {
    try {
      const recipeId = req.params.id;
      const recipe = await this.RecipeService.getById(recipeId);
      if (!recipe) {
        return res.status(404).send({ message: `Recipe not found.` });
      }
      await this.RecipeService.delete(recipeId);
      res.status(200).send({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
}
