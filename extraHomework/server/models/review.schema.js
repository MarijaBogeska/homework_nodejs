import { Schema, model } from "mongoose";

// Review Schema
const reviewSchema = new Schema({
  userName: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: [true, "userName is required"],
  },
  comment: {
    type: String,
    minLength: 5,
    maxLength: 500,
    required: [true, "comment is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "rating is required"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: [true, "Product is required"],
  },
  date: {
    type: Date,
  },
});

const Review = model("review", reviewSchema, "reviews");
export default Review;
