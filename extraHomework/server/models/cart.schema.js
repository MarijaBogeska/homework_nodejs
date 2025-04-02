import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [Schema.Types.ObjectId],
    ref: "product",
    required: [true, "Product is required"],
  },
  totalPrice: {
    type: Number,
    min: 0,
  },
});

const Cart = model("cart", cartSchema, "shoppingCarts");
export default Cart;
