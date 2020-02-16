const express = require("express");
const WebSocket = require("ws");
const Gpio = require("onoff").Gpio;
const relayClose = new Gpio(27, "high");
const relayOpen = new Gpio(22, "high");
const openButton = new Gpio(6, "in", "both", { debounceTimeout: 100 });
const closeButton = new Gpio(5, "in", "both", { debounceTimeout: 100 });

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

function gpioStatus() {
  console.log("----------");
  console.log(`Open button pressed!, its value is ${openButton.readSync()}`);
  console.log(`Close button pressed!, its value is ${closeButton.readSync()}`);
  console.log(`Open Relay status, its value is ${relayOpen.readSync()}`);
  console.log(`Close Relay status, its value is ${relayClose.readSync()}`);
  console.log("==========");
}

openButton.watch((err, value) => {
  if (err) {
    throw err;
  }
  relayOpen.writeSync(value);
  console.log(`Open button pressed!, its value is ${relayOpen.readSync()}`);
  gpioStatus();
});

closeButton.watch((err, value) => {
  if (err) {
    throw err;
  }
  relayClose.writeSync(value);
  console.log(`Close button pressed!, its value is ${relayClose.readSync()}`);
  gpioStatus();
});

// Websocket server setup
wss.on("connection", function connection(peer) {
  peer.isAlive = true;
  peer.on("pong", heartbeat);
  console.log("Client connected!");
  console.log("No of Clients: " + wss.clients.size);
  peer.send("Hello peer!");
  peer.on("message", function incoming(message) {
    console.log("Server received: %s", message);
    if (message === "OPEN") {
      relayClose.writeSync(1);
      relayOpen.writeSync(0);
      gpioStatus();
    } else if (message === "CLOSE") {
      relayOpen.writeSync(1);
      relayClose.writeSync(0);
      gpioStatus();
    } else {
      relayOpen.writeSync(1);
      relayClose.writeSync(1);
      gpioStatus();
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

// process.on("SIGINT", _ => {
//   openButton.unexport();
//   closeButton.unexport();
//   openDoor.unexport();
//   closeDoor.unexport();
// });
