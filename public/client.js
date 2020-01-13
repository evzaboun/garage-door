const client = new WebSocket("ws://192.168.1.250:8081");

client.onopen = function(e) {
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
  client.close();
};

window.ononline = event => {
  console.log("The network connection has reconnected.");
  client.send("CLIENT: ONLINE ");
};

client.onclose = function(e) {
  client.close();
  console.log("Disconnected: " + e.reason);
  console.log("Client onclose fired");
};

client.onerror = function(e) {
  console.log("onerror fired");
};

client.onmessage = function(e) {
  console.log("Message received: " + e.data);
  // Close the socket once one message has arrived.
  //client.close();
};

const openButtonPressed = function(e) {
  e.stopPropagation();
  client.send("OPEN");
  console.log("OPEN BUTTON PRESSED");
};

const closeButtonPressed = function(e) {
  e.stopPropagation();
  client.send("CLOSE");

  console.log("CLOSE BUTTON PRESSED");
};

window.addEventListener("load", event => {
  console.log("page is fully loaded");
});

document.addEventListener("click", event => {
  client.send("FREEZE");
});

document
  .getElementById("openButton")
  .addEventListener("click", openButtonPressed);
document
  .getElementById("closeButton")
  .addEventListener("click", closeButtonPressed);

document.addEventListener("visibilitychange", () => {
  console.log(document.visibilityState);
  client.send(`Visibility: ${document.visibilityState}`);
  if (document.visibilityState === "hidden") {
    client.send("FREEZE");
    client.close();
  } else if (document.visibilityState === "visible") {
    client.send(`Visibility: ${document.visibilityState}`);
    document.location.reload(false);
  }
});

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

client.on("open", heartbeat);
client.on("ping", heartbeat);
client.on("close", function clear() {
  clearTimeout(this.pingTimeout);
});
