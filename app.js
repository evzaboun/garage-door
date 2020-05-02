const express = require("express");
const app = express();
const emitter = require("./services/emitter");
const http = require("http");
const https = require("https");
const dotenv = require("dotenv").config();
const fs = require("fs");
const os = require("os");
const Socket = require("socket.io");
const DoorController = require("./services/doorController");
const database = require("./services/db");
const user = require("./routes/user");

const door = new DoorController();

const io = new Socket();
//setInterval(() => console.log(door.state), 1000);
app.use(express.json());

//Route all the requests to this path
app.use("/", user);

database.init();

app.use(express.static("./public"));

const port = process.env.PORT || 8080;
const ip = eval(process.env.HOSTNAME) || process.env.IP;

const httpServer = http.createServer(app).listen(8080, () => {
  console.log(`Server is listening on : ${ip + ":" + 8080}`);
});

const httpsServer = https
  .createServer(
    {
      key: fs.readFileSync("./ssl/garage.key"),
      cert: fs.readFileSync("./ssl/garage.crt"),
      ca: fs.readFileSync("./ssl/myCA.pem"),
      requestCert: false,
      rejectUnauthorized: false,
    },
    app
  )
  .listen(8443, () => {
    console.log(`Server is listening on : ${ip + ":" + 8433}`);
  });

// app.get("/", (req, res) => {
//   console.log("Root is resolved");
//   res.send("Hello from route!");
// });

io.on("connection", (socket) => {
  console.log(
    `Client connected. No # of clients: ${countClients(io.sockets.sockets)}`
  );

  socket.on("greet", (data) => {
    console.log(data);
    socket.emit("respond", { response: "Hello client!" });
  });

  socket.on("disconnect", () => {
    console.log(
      `Client disconnected. No # of clients: ${countClients(
        io.sockets.sockets
      )}`
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

  socket.conn.on("packet", (packet) => {
    if (packet.type === "ping") {
      //console.log("received ping");
      clearTimeout(timer);
    }
  });

  socket.conn.on("packetCreate", (packet) => {
    if (packet.type === "pong") {
      //console.log("sending pong");
      setTimer();
    }
  });
});

const countClients = (clients) => {
  return Object.keys(clients).length;
};

const options = {
  pingInterval: 500,
  pingTimeout: 3000,
};

io.attach(httpServer, options);
io.attach(httpsServer, options);

let timer = null;
const setTimer = () => {
  timer = setTimeout(() => emitter.emit("freeze"), 1500);
};
