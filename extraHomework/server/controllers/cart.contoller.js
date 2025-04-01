import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";

export default class CartController {
  constructor() {
    this.cartService = new CartService();
    this.productService = new ProductService();
  }
  async getById(req, res) {
    try {
      const id = req.params.id;
      const cart = await this.cartService.getById(id);
      res.send(cart);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async addToCart(req, res) {
    try {
      const cartId = req.params.id;
      const body = req.body;
      const products = body.products;
      let totalPrice = 0;
      for (const product of products) {
        let productInCart = await this.productService.getById(product);

        if (productInCart) {
          totalPrice += Number(productInCart.price);
        }
      }
      const addData = {
        ...body,
        totalPrice: totalPrice,
      };
      const addedData = await this.cartService.addToCart(cartId, addData);
      res.send(addedData);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}
