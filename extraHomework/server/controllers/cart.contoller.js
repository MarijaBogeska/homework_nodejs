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
      res.status(200).send(cart);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const carts = await this.cartService.getAll();
      res.status(200).send(carts);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async create(req, res) {
    try {
      const body = req.body;
      const cart = await this.cartService.create(body);
      res.send(cart);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async addToCart(req, res) {
    try {
      const cartId = req.params.id;
      const cart = await this.cartService.getById(cartId);
      const { products } = req.body;

      if (!cartId) {
        return res.status(400).send({ message: "Invalid cart ID" });
      }

      let totalPrice = Number(cart.totalPrice) || 0;
      let updatedProducts = [...cart.products];

      for (const productId of products) {
        const productInCart = await this.productService.getById(productId);
        if (productInCart && !cart.products.includes(productId)) {
          totalPrice += Number(productInCart.price);
          updatedProducts.push(productId);
        } else {
          console.log(`Product with ID ${productId} not found`);
        }
      }

      const addedData = await this.cartService.addToCart(cartId, {
        products: updatedProducts,
        totalPrice: totalPrice,
      });
      res.status(201).send(addedData);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  }
}
