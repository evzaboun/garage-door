const express = require("express");
const app = express();
const emitter = require("./eventEmitter");
const http = require("http");
const dotenv = require("dotenv").config();
const os = require("os");
const DoorController = require("./doorController");

const door = new DoorController();
//setInterval(() => console.log(door.state), 1000);

app.use(express.static("./public"));

app.get("/", (req, res) => {
  console.log("Root is resolved");
  res.send("Hello from route!");
});

const port = process.env.PORT || 8080;
const ip = eval(process.env.HOSTNAME) || process.env.IP;

const server = http.createServer(app);

const io = require("socket.io")(server, {
  pingInterval: 500,
  pingTimeout: 3000,
});

io.on("connection", function (socket) {
  console.log(`Client connected. No # of clients: ${io.engine.clientsCount}`);

  socket.on("greet", function (data) {
    console.log(data);
    socket.emit("respond", { response: "Hello client!" });
  });

  socket.on("disconnect", function () {
    console.log(
      `Client disconnected. No # of clients: ${io.engine.clientsCount}`
    );
  });

  socket.on("door", (message) => {
    console.log(`Server received a 'door' event: ${message}`);
    switch (message) {
      case "open":
        emitter.emit("open", message);
        break;
      case "close":
        emitter.emit("close", message);
        break;
      case "freeze":
        emitter.emit("freeze", message);
        break;
    }
  });

  socket.conn.on("packet", function (packet) {
    if (packet.type === "ping") {
      //console.log("received ping");
      clearTimeout(timer);
    }
  });

  socket.conn.on("packetCreate", function (packet) {
    if (packet.type === "pong") {
      //console.log("sending pong");
      setTimer();
    }
  });
});

server.listen(port, function () {
  console.log(`Server is listening on : ${ip + ":" + port}`);
});

let timer = null;
const setTimer = () => {
  timer = setTimeout(() => emitter.emit("freeze"), 1500);
};
