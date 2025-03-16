import { v4 as uuidv4 } from "uuid";
import TrainerModel from "../models/trainer.model.js";

export default class TrainerService {
  // I. GET ALL TRAINERS
  static async getAllTrainers(currentlyActive,sortBy) {
    const allTrainers= await TrainerModel.getAllTrainers(currentlyActive,sortBy);
    return allTrainers;
  }
  // II. GET TRAINER BY ID
  static async getTrainer(id) {
    const trainer = await TrainerModel.getTrainer(id);
    if (!trainer) {
      throw new Error(`Trainer with id: "${id}" not found.`);
    }
    return trainer;
  }
  // III. UPDATE TRAINER INFO
  static async updateTrainer(id, body) {
    const allTrainers = await this.getAllTrainers();
    const trainer = await TrainerModel.getTrainer(id);
    if (!trainer) {
      throw new Error(`Trainer with id: "${id}" not found.`);
    }
    if (allTrainers.some((trainer) => trainer.email === body.email)) {
      throw new Error(`Trainer with email: "${body.email}" already exists.`);
    }
    const updatedTrainer = {
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    return await TrainerModel.updateTrainer(id, updatedTrainer);
  }
  // IV. ADD TRAINER
  static async addTrainer(body) {
    const allTrainers = await this.getAllTrainers();
    if (allTrainers.some((trainer) => trainer.email === body.email)) {
      throw new Error(`Trainer with email: "${body.email}" already exists.`);
    }
    const newTrainer = {
      id: uuidv4(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    return await TrainerModel.addTrainer(newTrainer);
  }
  // V. DELETE TRAINER
  static async deleteTrainer(id) {
    return await TrainerModel.deleteTrainer(id);
  }
  // VI. DELETE ALL TRAINERS
  static async deleteAllTrainers() {
    return await TrainerModel.deleteAllTrainers();
  }
}
