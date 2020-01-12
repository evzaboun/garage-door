const express = require("express");
const WebSocket = require("ws");
const Gpio = require("onoff").Gpio;
const closeDoorApp = new Gpio(27, "high");
const openDoorApp = new Gpio(22, "high");

const wss = new WebSocket.Server({ port: 8081 });
const app = express();

//Express app
app.use(express.static("./public"));

const port = process.env.PORT || 8080;

app.set("port", port);

app.listen(port, "192.168.1.250", () => {
  console.log(`Server is listening on port: ${port}`);
});

app.get("/", (req, res) => {
  console.log("Rooot is resolved");
  res.send("Hello from route!");
});

// Websocket server setup
wss.on("connection", function connection(peer) {
  peer.isAlive = true;
  peer.on("pong", heartbeat);
  console.log("Client connected!");
  console.log("No of Clients: " + wss.clients.size);

  peer.on("message", function incoming(message) {
    console.log("Server received: %s", message);
    if (message === "OPEN") {
      closeDoorApp.writeSync(1);
      openDoorApp.writeSync(0);
    } else if (message === "CLOSE") {
      openDoorApp.writeSync(1);
      closeDoorApp.writeSync(0);
    } else {
      openDoorApp.writeSync(1);
      closeDoorApp.writeSync(1);
    }
  });

  peer.on("close", function onClose(close) {
    console.log("Ws closed!");
    console.log("No of Clients: " + wss.clients.size);
    peer.close();
  });

  // if(/*peer &&*/ peer.readyState === WebSocket.OPEN){
  //     peer.send(message);
  // }

  // peer.on('open', function onOpen(open) {
  //     console.log('Ws openned!');
  // });
});

//Polling the ws connection
function noop() {}

function heartbeat() {
  this.isAlive = true;
}

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(peer) {
    if (peer.isAlive === false) return peer.terminate();
    peer.isAlive = false;
    peer.ping(noop);
    console.log("pinging...");
  });
}, 1000);
