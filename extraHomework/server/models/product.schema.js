import { Schema, model } from "mongoose";

// Product Schema
//name, description, price, quantity, reviews, rating and category
const productSchema = new Schema({
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
  price: {
    type: Number,
    min: 0,
    required: [true, "price is required"],
  },
  quantity: {
    type: Number,
    min: 0,
    required: [true, "quantity is required"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Category is required"],
  },
  photo: {
    type: String,
    required: [true, "Photo URL is required"],
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
      },
      message: "Invalid image URL format",
    },
    required: [true, "photo is required"],
  },
  updatedAt: {
    type: Date,
  },
});

const Product = model("product", productSchema, "products");
export default Product;
