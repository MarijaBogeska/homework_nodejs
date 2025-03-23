import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routers/recipe.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/recipes", router);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Sever is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
