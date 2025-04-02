import Review from "../models/review.schema.js";
import Product from "../models/product.schema.js";
const { ObjectId } = "mongoose.Types";

export default class ReviewService {
  //GET ALL REVIEWS
  async getAll(filter = {}) {
    const reviews = Review.find(filter).collation({
      locale: "en",
      strength: 2,
    });
    return reviews;
  }
  // GET REVIEW BY ID
  async getById(id) {
    const review = Review.findById(id);
    return review;
  }
  // CREATE NEW REVIEW
  async create(body) {
    const review = await Review.create(body);
    await this.updateRating(review.product);
    return review;
  }
  //UPDATE REVIEW BY ID
  async update(id, body) {
    let review = await Review.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }
    const updatedData = {
      ...body,
      ...review,
    };
    review.set(updatedData);
    await review.save();
    await this.updateRating(review.product);
    return review;
  }

  // UPDATE PRODUCT RATING
  async updateRating(productId) {
    if (!productId) {
      throw new Error("Invalid product ID");
    }
    const foundProduct = await Product.findById(productId);
    await foundProduct.populate("reviews");
    if (!foundProduct) return;
    let sum = 0;
    let reviewCount = foundProduct.reviews.length;
    for (const reviewId of foundProduct.reviews) {
      const review = await Review.findById(reviewId);
      sum += review.rating || 0;
    }
    const avgRating = reviewCount > 0 ? sum / reviewCount : 0;
    foundProduct.rating = avgRating.toFixed(1);
    await foundProduct.save();
  }
  // DELETE REVIEW BY ID
  async delete(id) {
    return Review.findByIdAndDelete(id);
  }
}
