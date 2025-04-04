import CategoryService from "../services/category.service.js";

export default class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }
  // GET ALL CATEGORIES
  async getAll(req, res) {
    try {
      const allCategories = await this.categoryService.getCategories();
      res.send(allCategories);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  // CREATE CATEGORY
  async create(req, res) {
    try {
      const { name } = req.body;
      const newCategory = await this.categoryService.createCategory({ name });
      res.send(newCategory);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
