import { error } from "console";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

//index.js path
const filePath = fileURLToPath(import.meta.url);
//folder path
const folderPath = path.dirname(filePath);
//homework.txt path
const newFilePath = path.join(folderPath, "homework.txt");
//write in homework.txt
fs.writeFileSync(newFilePath, "Homework 02 in Basic Node");
//append file
fs.appendFile(newFilePath, `\nFINISHED`, (error) => {
  if (error) {
    console.log("error", error);
  } else {                                //read file
    console.log("text added:\n", fs.readFileSync(newFilePath, "utf8"));
  }
});


