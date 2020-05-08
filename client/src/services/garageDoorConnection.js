import emitter from "./emitter";
import io from "socket.io-client";
import auth from "../services/auth";

const garageDoorConnection = { instance: null };

garageDoorConnection.connect = function () {
  if (this.instance) {
    return;
  }

  // this.instance = io("http://localhost:8080", {
  this.instance = io("http://192.168.1.250:8080", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    query: { token: auth.getToken() },
  });

  this.instance.on("connect", function () {
    console.log("connected!");
    //this.instance.emit("greet", { message: "Hello server!" });
    emitter.emit("connected");
  });

  this.instance.on("respond", function (data) {
    console.log(data);
  });

  this.instance.on("ping", () => {
    //console.log("ping...");
  });

  this.instance.on("pong", function (latency) {
    //console.log("pong...... " + latency);
  });

  this.instance.on("reconnect_failed", () => {
    emitter.emit("disconnected");
  });

  this.instance.on("reconnect_error", (error) => {
    emitter.emit("disconnected");
  });

  this.instance.on("reconnecting", (attemptNumber) => {
    emitter.emit("disconnected");
  });

  //On error
};

garageDoorConnection.disconnect = function () {
  if (this.instance) {
    this.instance.close();
  }
  this.instance = null;
};

garageDoorConnection.send = function (event, message) {
  if (this.instance) {
    console.log(message);
    this.instance.emit(event, message);
  }
};

export default garageDoorConnection;
