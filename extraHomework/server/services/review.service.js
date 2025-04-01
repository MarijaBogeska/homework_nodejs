import Review from "../models/review.schema.js";

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
    return await Review.create(body);
  }
  //UPDATE REVIEW BY ID
  async update(id, body) {
    let review = await this.getById(id);
    if (!review) {
      throw new Error("Review not found");
    }
    const updatedData = {
      ...body,
      ...review,
    };
    review.set(updatedData);
    await review.save();
    return review;
  }
  // DELETE REVIEW BY ID
  async delete(id) {
    return Review.findByIdAndDelete(id);
  }
}
