import Category from "../models/category.schema.js";

export default class CategoryService {
      // GET CATEGORIES
  async getCategories(){
    return await Category.find()
  }
  // CREATE CATEGORY
  async createCategory(body){
    return await Category.create(body);
  }
}