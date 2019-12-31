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

const openButtonPressed = function() {
  client.send("OPEN BUTTON PRESSED");
  console.log("OPEN");
};

const closeButtonPressed = function() {
  client.send("CLOSE BUTTON PRESSED");
  console.log("CLOSE");
};

window.addEventListener("load", event => {
  console.log("page is fully loaded");
});

document
  .getElementById("openButton")
  .addEventListener("click", openButtonPressed);
document
  .getElementById("closeButton")
  .addEventListener("click", closeButtonPressed);

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
