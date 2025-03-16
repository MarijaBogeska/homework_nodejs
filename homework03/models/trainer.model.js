import DataService from "../services/data.service.js";
import path from "path";
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const filePathDirectory = path.dirname(currentFilePath);
const trainersPath = path.join(
  filePathDirectory,
  "..",
  "data",
  "trainers.json"
);

export default class TrainerModel {
  // I. GET ALL TRAINERS
  static async getAllTrainers(currentlyActive, sortBy) {
    let allTrainers = await DataService.readData(trainersPath);
    if (typeof currentlyActive === "boolean") {
     allTrainers= allTrainers.filter(
        (trainer) => trainer.isCurrentlyTeaching === currentlyActive
      );
    }
    if (sortBy === "coursesAsc") {
      allTrainers.sort((a, b) => a.coursesFinished - b.coursesFinished);
    } else if (sortBy === "coursesDesc") {
      allTrainers.sort((a, b) => b.coursesFinished - a.coursesFinished);
    }
    return allTrainers;
  }
  // II. GET TRAINER BY ID
  static async getTrainer(id) {
    const allTrainers = await this.getAllTrainers();
    const foundTrainer = allTrainers.find((trainer) => trainer.id === id);
    return foundTrainer;
  }
  // III. UPDATE TRAINER INFO
  static async updateTrainer(id, body) {
    const allTrainers = await this.getAllTrainers();
    const foundTainerIndex = allTrainers.findIndex(
      (trainer) => trainer.id === id
    );
    if (foundTainerIndex === -1) {
      console.error(`Trainer with id: "${id}" not found.`);
      return null;
    }
    allTrainers[foundTainerIndex] = body;
    await DataService.writeData(trainersPath, allTrainers);
    return allTrainers[foundTainerIndex];
  }
  // IV. ADD TRAINER
  static async addTrainer(body) {
    const allTrainers = await this.getAllTrainers();
    allTrainers.push(body);
    await DataService.writeData(trainersPath, allTrainers);
    return body;
  }
  // V. DELETE TRAINER
  static async deleteTrainer(id) {
    const allTrainers = await this.getAllTrainers();
    const filteredTrainers = allTrainers.filter((trainer) => trainer.id !== id);
    if (filteredTrainers.length === allTrainers.length) {
      console.error(`Trainer with id: "${id}" not found.`);
      return null;
    }
    await DataService.writeData(trainersPath, filteredTrainers);
    return filteredTrainers;
  }
  // VI. DELETE ALL TRAINERS
  static async deleteAllTrainers() {
    await DataService.writeData(trainersPath, []);
  }
}
