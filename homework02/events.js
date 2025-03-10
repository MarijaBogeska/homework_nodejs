import { EventEmitter } from "node:events";
import fs from "fs";

const emitter = new EventEmitter();
const appendFileAsync = async function (studentName) {
  try {
    await fs.promises.appendFile(
      "./students.txt",
      `Added student: ${studentName}\n`,
      "utf8"
    );
    console.log("Student added successfully!");
  } catch (error) {
    console.error(`Error appending student: ${error.message}`);
  }
};
emitter.addListener("studentAdded", (studentName) => {
  console.log(`Student name ${studentName} added.`);
  appendFileAsync(studentName);
});

export default emitter;
