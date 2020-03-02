// Websocket client-server communication setup
const WebSocket = require("ws");
const eventEmitter = require("./eventEmitter");
const wss = new WebSocket.Server({ port: process.env.WS_PORT });

wss.on("connection", function connection(peer) {
  peer.isAlive = true;
  peer.on("pong", heartbeat);
  console.log("Client connected!");
  console.log("No of Clients: " + wss.clients.size);
  peer.send("Hello peer!");
  peer.on("message", function incoming(message) {
    console.log("Server received: %s", message);
    if (message === "OPEN") {
      eventEmitter.emit("open", "open");
    } else if (message === "CLOSE") {
      eventEmitter.emit("close", "close");
    } else {
      eventEmitter.emit("freeze", "freeze");
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

setInterval(function ping() {
  wss.clients.forEach(function each(peer) {
    if (peer.isAlive === false) return peer.terminate();
    peer.isAlive = false;
    peer.ping(noop);
  });
}, 1000);

module.exports = wss;
