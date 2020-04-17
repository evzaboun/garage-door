const socket = io({
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

const toggleButtonState = function (enabled) {
  if (enabled) {
    document.getElementById("openButton").disabled = false;
    document.getElementById("closeButton").disabled = false;
  } else {
    document.getElementById("openButton").disabled = true;
    document.getElementById("closeButton").disabled = true;
  }
};

socket.on("connect", function () {
  console.log("connected!");
  socket.emit("greet", { message: "Hello server!" });
  toggleButtonState(true);
});

socket.on("respond", function (data) {
  console.log(data);
});

socket.on("ping", () => {
  //console.log("ping...");
});

socket.on("pong", function (latency) {
  //console.log("pong...... " + latency);
});

socket.on("reconnect_failed", () => {
  toggleButtonState(false);
});

socket.on("reconnect_error", (error) => {
  toggleButtonState(false);
});

socket.on("reconnecting", (attemptNumber) => {
  toggleButtonState(false);
});

const openButtonPressed = function (e) {
  stopBubbling(e);
  socket.emit("door", "open");
  navigator.vibrate(15);
  console.log("OPEN BUTTON PRESSED");
};

const closeButtonPressed = function (e) {
  stopBubbling(e);
  navigator.vibrate(15);
  socket.emit("door", "close");
  console.log("CLOSE BUTTON PRESSED");
};

const freezeButtonPressed = function (e) {
  stopBubbling(e);
  navigator.vibrate([20, 50, 20]);
  socket.emit("door", "freeze");
  console.log("FREEZE BUTTON PRESSED");
};

const stopBubbling = function (e) {
  e.preventDefault();
  e.stopPropagation();
};

document
  .getElementById("openButton")
  .addEventListener("click", openButtonPressed);
document
  .getElementById("closeButton")
  .addEventListener("click", closeButtonPressed);

document
  .getElementById("freezeButton")
  .addEventListener("click", freezeButtonPressed);

// document.addEventListener("visibilitychange", () => {
//   console.log(document.visibilityState);
//   if (document.visibilityState === "hidden") {
//     socket.emit("door", "freeze");
//     toggleButtonState(false);
//   } else if (document.visibilityState === "visible") {
//     toggleButtonState(true);
//   }
// });
