const client = new WebSocket("ws://192.168.1.250:8081");

client.onopen = function(e) {
  console.log(client.readyState);
  //toggleButtonState(true);
  client.send("CLIENT: CONNECTED TO WS SERVER");
  console.log("Client onopen fired");
};

window.onunload = window.onbeforeunload = function(event) {
  client.send("CLIENT: DISCONNECTED FROM WS SERVER");
  client.close();
};

window.onoffline = event => {
  console.log("The network connection has been lost.");
  client.send("CLIENT: OFFLINE ");
  toggleButtonState(false);
  console.log(client.readyState);
  client.close();
};

window.ononline = event => {
  console.log("The network connection has reconnected.");
  toggleButtonState(true);
  document.location.reload(false);
  client.send("CLIENT: ONLINE ");
};

client.onclose = function(e) {
  toggleButtonState(false);
  console.log(client.readyState);
  client.close();
  console.log("Disconnected: " + e.reason);
  console.log("Client onclose fired");
};

client.onerror = function(e) {
  console.log(`onerror fired: ${e.reason}`);
};

client.onmessage = function(e) {
  console.log("Message received: " + e.data);
  toggleButtonState(true);
  // Close the socket once one message has arrived.
  //client.close();
};

const openButtonPressed = function(e) {
  e.preventDefault();
  e.stopPropagation();
  client.send("OPEN");
  navigator.vibrate(15);
  console.log("OPEN BUTTON PRESSED");
};

const closeButtonPressed = function(e) {
  e.preventDefault();
  e.stopPropagation();
  navigator.vibrate(15);
  client.send("CLOSE");
  console.log("CLOSE BUTTON PRESSED");
};

const toggleButtonState = function(enabled) {
  if (enabled) {
    document.getElementById("openButton").disabled = false;
    document.getElementById("closeButton").disabled = false;
  } else {
    document.getElementById("openButton").disabled = true;
    document.getElementById("closeButton").disabled = true;
  }
};

window.addEventListener("load", event => {
  console.log("page is fully loaded");
});

document.addEventListener("click", event => {
  client.send("FREEZE");
  navigator.vibrate([20, 50, 20]);
});

document
  .getElementById("openButton")
  .addEventListener("click", openButtonPressed);
document
  .getElementById("closeButton")
  .addEventListener("click", closeButtonPressed);

// document.addEventListener("visibilitychange", () => {
//   console.log(document.visibilityState);
//   client.send(`Visibility: ${document.visibilityState}`);
//   if (document.visibilityState === "hidden") {
//     client.send("FREEZE");
//     client.close();
//   } else if (document.visibilityState === "visible") {
//     client.send(`Visibility: ${document.visibilityState}`);
//     document.location.reload(false);
//   }
// });

function heartbeat() {
  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.

  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}

//client.on("open", heartbeat);
//client.on("ping", heartbeat);
// client.on("close", function clear() {
//   clearTimeout(this.pingTimeout);
// });
