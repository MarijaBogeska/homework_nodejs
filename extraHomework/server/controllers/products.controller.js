import ProductService from "../services/product.service.js";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  // GET ALL PRODUCTS
  async getAll(req, res) {
    try {
      const filter = {};
      // FILTERS
      if (req.query.category) {
        filter.category = req.query.category;
      }
      if (req.query.title) {
        filter.title = req.query.title;
      }
      const allProducts = await this.productService.getAll(filter);
      if (allProducts.length === 0) {
        return res.status(404).send({ message: `Products not found.` });
      }
      res.send(allProducts);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // GET PRODUCT BY ID
  async getProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await this.productService.getById(productId);
      if (!product) {
        return res.status(404).send({ message: `Product not found.` });
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  // CREATE NEW PRODUCT
  async create(req, res) {
    try {
      const body = req.body;
      const newProduct = await this.productService.create(body);
      res.status(201).send(newProduct);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  //UPDATE PRODUCT BY ID
  async update(req, res) {
    try {
      const productId = req.params.id;
      const {
        title,
        description,
        price,
        quantity,
        category,
        photo,
        rating,
        reviews,
      } = req.body;
      const productData = { updatedAt: new Date().toISOString() };
      for (const [key, value] of Object.entries({
        title,
        description,
        price,
        quantity,
        category,
        photo,
        rating,
        reviews,
      })) {
        if (value) {
          productData[key] = value;
        }
      }
      const updatedProduct = await this.productService.update(
        productId,
        productData
      );
      if (!updatedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }

      res.send({ message: `Product updated successfully.` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  // DELETE PRODUCT
  async delete(req, res) {
    try {
      const productId = req.params.id;
      const product = await this.productService.getById(productId);
      if (!product) {
        return res.status(404).send({ message: `Product not found.` });
      }
      await this.productService.delete(productId);
      res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
}
