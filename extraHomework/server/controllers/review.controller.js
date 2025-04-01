import ReviewService from "../services/review.service.js";
import ProductService from "../services/product.service.js";

export default class reviewService {
  constructor() {
    this.reviewService = new ReviewService();
    this.productService = new ProductService();
  }
  // GET ALL REVIEWS
  async getAll(req, res) {
    try {
      const filter = {};
      // FILTERS
      //   if (req.query.category) {
      //     filter.category = req.query.category;
      //   }
      const allReviews = await this.reviewService.getAll(filter);
      if (allReviews.length === 0) {
        return res.status(404).send({ message: `Reviews not found.` });
      }
      res.send(allReviews);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // GET REVIEW BY ID
  async getReview(req, res) {
    try {
      const reviewId = req.params.id;
      const review = await this.reviewService.getById(reviewId);
      if (!review) {
        return res.status(404).send({ message: `review not found.` });
      }
      res.status(200).send(review);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  // CREATE NEW REVIEW
  async create(req, res) {
    try {
      const { product, userName, comment, rating } = req.body;
      const foundProduct = await this.productService.getById(product);
      if (!foundProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
      const review = {
        product,
        userName,
        comment,
        rating: rating || 0,
        date: new Date().toISOString(),
      };
      const newReview = await this.reviewService.create(review);
      // save the review in product
      foundProduct.reviews.push(newReview._id);
      await foundProduct.save();
      // update rating
      let sum = 0;
      for (const reviewId of foundProduct.reviews) {
        const review = await this.reviewService.getById(reviewId); // Fetch the review
        sum += review.rating || 0;
      }
      const avgRating =
        foundProduct.reviews.length > 0 ? sum / foundProduct.reviews.length : 0;
      foundProduct.rating = avgRating.toFixed(1);
      await foundProduct.save();

      res.status(201).send(foundProduct);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  //UPDATE REVIEW BY ID
  async update(req, res) {
    try {
      const reviewId = req.params.id;
      const { userName, comment, rating, product } = req.body;
      const reviewData = { date: new Date().toISOString() };
      for (const [key, value] of Object.entries({
        userName,
        comment,
        rating,
        product,
      })) {
        if (value) {
          reviewData[key] = value;
        }
      }
      const review = await this.reviewService.getById(reviewId);
      if (!review) {
        return res.status(404).send({ message: "review not found" });
      }
      const newReview = await this.reviewService.update(reviewId, reviewData);
      if (!newReview) {
        return res.status(404).send({ message: "review update failed" });
      }
      // Update product rating
      // const productId = review.product;
      // const foundProduct = await this.productService.getById(productId);
      // await foundProduct.populate("reviews");
      // let sum = 0;
      // for (const reviewId of foundProduct.reviews) {
      //   const review = await this.reviewService.getById(reviewId);
      //   sum += review.rating || 0;
      // }
      // const avgRating =
      //   foundProduct.reviews.length > 0 ? sum / foundProduct.reviews.length : 0;
      // foundProduct.rating = avgRating.toFixed(1);
      // await foundProduct.save();

      res.send({ message: `review updated successfully.` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  // DELETE REVIEW
  async delete(req, res) {
    try {
      const reviewId = req.params.id;
      const review = await this.reviewService.getById(reviewId);
      console.log(review);
      if (!review) {
        return res.status(404).send({ message: `review not found.` });
      }
      await this.reviewService.delete(reviewId);
      // Remove review from product
      await this.productService.update(review.product, {
        $pull: { reviews: reviewId },
      });
      const product = await this.productService.getById(review.product);
      product.reviews.pull(reviewId);
      await product.save();

      // Update product rating
      let sum = 0;
      for (const reviewId of product.reviews) {
        const review = await this.reviewService.getById(reviewId); // Fetch the review
        sum += review.rating || 0;
      }
      const avgRating =
        product.reviews.length > 0 ? sum / product.reviews.length : 0;
      product.rating = avgRating.toFixed(1);
      await product.save();

      res.status(200).send({ message: "review deleted successfully" });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
}
