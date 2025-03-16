import TrainerService from "../services/trainer.service.js";

export default class TrainerController {
  // I. GET ALL TRAINERS
  static async getAllTrainers(req, res) {
    try {
      let currentlyTeaching = undefined;
      let sortBy = req.query.sortBy;
      if (req.query.currentlyTeaching === "true") {
        currentlyTeaching = true;
      } else if (req.query.currentlyTeaching === "false") {
        currentlyTeaching = false;
      }
      let trainers = await TrainerService.getAllTrainers(
        currentlyTeaching,
        sortBy
      );
       res.status(200).send(trainers);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // II. GET TRAINER
  static async getTrainer(req, res) {
    try {
      const trainer = await TrainerService.getTrainer(req.params.id);
      res.send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // III. UPDATE TRAINER INFO
  static async updateTrainer(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const trainer = await TrainerService.updateTrainer(id, body);
      res.send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // IV. ADD TRAINER
  static async addTrainer(req, res) {
    try {
      const body = req.body;
      const trainer = await TrainerService.addTrainer(body);
      res.status(201).send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // V. DELETE TRAINER
  static async deleteTrainer(req, res) {
    try {
      const id = req.params.id;
      const trainer = await TrainerService.deleteTrainer(id);
      if (!trainer) {
        res.status(404).send({ message: "Trainer not found" });
      } else {
        res.status(200).send({ message: "Trainer deleted" });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // VI. DELETE ALL TRAINERS
  static async deleteAllTrainers(req, res) {
    try {
      await TrainerService.deleteAllTrainers();
      res.status(200).send({ message: "All trainers deleted" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  //currently teaching
  static async currentlyTeaching(req, res) {
    try {
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}
