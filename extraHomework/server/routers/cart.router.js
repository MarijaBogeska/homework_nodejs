import CartController from "../controllers/cart.contoller.js";
import { Router } from "express";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.put("/:id", (req, res) => cartController.addToCart(req, res));

export default cartRouter;
