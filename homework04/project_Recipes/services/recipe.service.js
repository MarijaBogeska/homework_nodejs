import Recipe from "../schemas/recipe.schema.js";

export default class RecipeService {
  // GET ALL RECIPES
  async getAll(filter = {}) {
    const recipes = Recipe.find(filter).collation({
      locale: "en",
      strength: 2,
    });
    return recipes;
  }
  // GET RECIPE BY ID
  async getById(id) {
    const recipe = Recipe.findById(id);
    return recipe;
  }
  // CREATE NEW RECIPE
  async create(body) {
    return Recipe.create(body);
  }
  //UPDATE RECIPE BY ID
  async update(id, body) {
    let recipe = await Recipe.findById(id);
    const updatedData = {
      ...recipe,
      ...body,
    };
    recipe.set(updatedData);
    await recipe.save();
    return recipe;
  }
  // DELETE RECIPE BY ID
  async delete(id) {
    return Recipe.findByIdAndDelete(id);
  }
  // GET VEGETARIAN RECIPES
  async getVegetarian() {
    const recipes = await Recipe.find({ isVegetarian: true });
    return recipes;
  }
  // SEARCH RECIPES
  async searchRecipesByTitle(title) {
    const recipe = Recipe.find({ title: title }).collation({
      locale: "en",
      strength: 2,
    });
    return recipe;
  }
}
