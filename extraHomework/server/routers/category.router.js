import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/", (req, res) => categoryController.getAll(req, res));

export default categoryRouter;
