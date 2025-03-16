import express from "express";
import router from "./routes/trainers.routes.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();

app.use(express.json());

const currentFilePath = fileURLToPath(import.meta.url);
const appPath= path.dirname(currentFilePath);
const homePage = path.join(appPath,"homePage");

app.use("/home", express.static(homePage));

app.use("/home/picture.png", express.static(homePage));

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use("/api/trainers", router);

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on port ${PORT}`);
});