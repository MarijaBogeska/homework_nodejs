import { Router } from "express";
import RecipeController from "../controllers/recipe.contoller.js";

const router = Router();
const recipeController = new RecipeController();

router.get("/", (req, res) => recipeController.getRecipes(req, res));
router.get("/recipe/:id", (req, res) => recipeController.getRecipe(req, res));
router.get("/vegetarian", (req, res) =>
  recipeController.getVegetarianRecipes(req, res)
);
router.get("/search", (req, res) => recipeController.searchRecipes(req, res));
router.put("/:id", (req, res) => recipeController.updateRecipe(req, res));
router.post("/", (req, res) => recipeController.createRecipe(req, res));
router.delete("/:id", (req, res) => recipeController.delete(req, res));

export default router;
