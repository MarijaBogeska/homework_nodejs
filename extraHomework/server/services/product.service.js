import Product from "../models/product.schema.js";

export default class ProductService {
  //GET ALL PRODUCTS
  async getAll(filter = {}) {
    const products = Product.find(filter).collation({
      locale: "en",
      strength: 2,
    });
    return products;
  }
  // GET PRODUCT BY ID
  async getById(id) {
    const product = Product.findById(id).populate("reviews");
    return product;
  }
  // CREATE NEW PRODUCT
  async create(body) {
    return Product.create(body);
  }
  //UPDATE PRODUCT BY ID
  async update(id, body) {
    let product = await Product.findById(id);
    const updatedData = {
      ...product,
      ...body,
    };
    product.set(updatedData);
    await product.save();
    return product;
  }
  // ADD REVIEW
  async addReview(productId, reviewId) {
    let product = await Product.findById(productId);
    const updatedProduct = {
      productId,
      $push: { reviews: reviewId },
    };
    product.set(updatedProduct);
    await product.save();
    return product;
  }
  // DELETE PRODUCT BY ID
  async delete(id) {
    return Product.findByIdAndDelete(id);
  }
  
}
