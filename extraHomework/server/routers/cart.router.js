import CartController from "../controllers/cart.contoller.js";
import { Router } from "express";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.patch("/:id", (req, res) => cartController.addToCart(req, res));
cartRouter.get("/:id", (req, res) => cartController.getById(req, res));
cartRouter.get("/", (req, res) => cartController.getAll(req, res));
cartRouter.post("/", (req, res) => cartController.create(req, res));
export default cartRouter;
