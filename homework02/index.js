import http from "node:http";
import emitter from "./events.js";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Homework II</h1>");
  } else if (req.url === "/student") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`<h3>Student info:</h3>
        <ul>
            <li> Student Name: Marija</li>
            <li>Student Lastname: Bogeska</li>
            <li>Academy: Qinshift Academy</li>
            <li>Subject: Nodejs Basic</li>
        </ul>
        `);
  } else if (req.url === "/add_student") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`<h3>Add student:</h3>
      <form action="/all_students" method="POST">
        <label for="inputName">Student name:</label>
        <input type="text" name="inputName" placeholder="Enter name..."/>
        <button type="submit">Submit</button>
      </form>
        `);
  } else if (req.url === "/all_students" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = new URLSearchParams(body);
      const inputName = data.get("inputName");
      res.writeHead(200, { "content-type": "text/html" });
      if (!inputName) {
        res.end("Error: Student name cannot be empty.");
      } else {
        const formatedName =
          inputName.charAt(0).toUpperCase() + inputName.slice(1);
        res.end(`<p>Student name: ${formatedName}</p>`);
        emitter.emit("studentAdded", formatedName);
      }
    });
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 - Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
