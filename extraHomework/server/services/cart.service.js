import Cart from "../models/cart.schema.js";

export default class CartService {
  async getAll() {
    return await Cart.find({});
  }
  async getById(id) {
    const cart = await Cart.findById(id);
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }
  async addToCart(cartId, body) {
    const cart = await Cart.findById(cartId);
    console.log(cart);
    const addedData = {
      ...cart,
      ...body,
    };
    cart.set(addedData);
    await cart.save();
    return cart;
  }
 
}
