import CategoryService from "../services/category.service.js";

export default class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }
  async getAll(req, res) {
    try {
      const allCategories = await this.categoryService.getCategories();
      res.send(allCategories);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
