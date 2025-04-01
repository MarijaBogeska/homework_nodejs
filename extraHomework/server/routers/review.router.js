import { Router } from "express";
import ReviewController from "../controllers/review.controller.js";

const reviewRouter = Router();
const reviewController = new ReviewController();

reviewRouter.get("/", (req, res) => reviewController.getAll(req, res));
reviewRouter.get("/:id", (req, res) => reviewController.getReview(req, res));
reviewRouter.post("/", (req, res) => reviewController.create(req, res));
reviewRouter.put("/:id", (req, res) => reviewController.update(req, res));
reviewRouter.delete("/:id", (req, res) => reviewController.delete(req, res));

export default reviewRouter;
