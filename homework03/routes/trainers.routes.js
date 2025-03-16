import express, { Router } from "express";
import TrainerController from "../controllers/trainer.controller.js";

const router = Router();

router.get("", TrainerController.getAllTrainers);
router.get("/:id", TrainerController.getTrainer);
router.post("", TrainerController.addTrainer);
router.put("/:id", TrainerController.updateTrainer);
router.delete("/:id", TrainerController.deleteTrainer);
router.delete("",TrainerController.deleteAllTrainers);

export default router;