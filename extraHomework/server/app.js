import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routers/product.router.js";
import reviewRouter from "./routers/review.router.js";
import cartRouter from "./routers/cart.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/cart", cartRouter);

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
