const express = require("express");
const dotenv = require("dotenv").config();
const Controller = require("./controller");
const ws = require("./ws");
const os = require("os");
const app = express();

const door = new Controller();
//setInterval(() => console.log(door.state), 1000);

app.use(express.static("./public"));
const port = process.env.PORT || 8080;
const ip = eval(process.env.HOSTNAME) || process.env.IP;

app.set("port", port);

app.listen(port, ip, () => {
  console.log(`Server is listening on : ${ip + ":" + port}`);
});

app.get("/", (req, res) => {
  console.log("Rooot is resolved");
  res.send("Hello from route!");
});
