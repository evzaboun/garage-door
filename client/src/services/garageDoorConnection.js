import events from "./events";

const garageDoorConnection = { instance: null };

garageDoorConnection.connect = function () {
  if (this.instance) {
    return;
  }

  this.instance = new WebSocket("ws://192.168.1.250:8081");

  //event listeners
  this.instance.onopen = () => {
    console.log("connected websocket");
    events.emit("connected");
  };

  this.instance.onclose = (e) => {
    console.log(`Socket is closed: ${e.reason}`);
    events.emit("disconnected");
  };

  this.instance.onmessage = (e) => {
    console.log(`Message from server: ${e.data}`);
  };

  this.instance.onerror = (err) => {
    console.error("Socket encountered error: ", err.message, "Closing socket");
    this.instance.close();
  };
};

garageDoorConnection.disconnect = function () {
  if (this.instance) {
    this.instance.close();
  }
  this.instance = null;
};

garageDoorConnection.send = function (message) {
  if (this.instance) {
    this.instance.send(message);
  }
};

export default garageDoorConnection;
