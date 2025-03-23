import { Schema, model, mongo } from "mongoose";
import { difficulty, category } from "../util/constants.js";

const recipeSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: [true, "title is required"],
    unique: [true, "Error, duplicate found"],
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 300,
    required: [true, "description is required"],
  },
  ingredients: {
    type: [String],
    required: [true, "ingredients are required"],
  },
  instructions: {
    type: [String],
    required: [true, "instructions are required"],
  },
  cookingTime: {
    type: Number,
  },
  difficulty: {
    type: String,
    enum: difficulty,
  },
  isVegetarian: {
    type: Boolean,
  },
  category: {
    type: String,
    enum: category,
  },
  updatedAt: {
    type: String,
  },
});

const Recipe = model("recipe", recipeSchema, "recipes");
export default Recipe;
