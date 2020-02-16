// Garage signal decision controller
const Gpio = require("onoff").Gpio;
const eventEmitter = require("./eventEmitter");
const PushButton = require("./switches/PushButton");
const openButton = new PushButton(6);
const closeButton = new PushButton(5);
const relayClose = new Gpio(27, "high");
const relayOpen = new Gpio(22, "high");

eventEmitter.on("open", (source, action) => signal(source, action));
eventEmitter.on("close", (source, action) => signal(source, action));
eventEmitter.on("freeze", (source, action) => signal(source, action));

function signal(source, action) {
  if (source === "PushButton") {
    //open
    //relayClose.writeSync(1);
    //relayOpen.writeSync(0);
    //gpioStatus();
    //close
    // relayOpen.writeSync(1);
    // relayClose.writeSync(0);
    // gpioStatus();
    //freeze
    // relayOpen.writeSync(1);
    // relayClose.writeSync(1);
    // gpioStatus();
    console.log(`Pushbutton Pressed : ${action} , source : ${source} `);
  } else if (source === "Reed") {
    console.log(`Reed Switch Pressed : ${action} , source : ${source} `);
  } else if (source === "UIButton") {
    console.log(`UIButton Pressed : ${action} , source : ${source} `);
  }
}

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

// process.on("SIGINT", _ => {
//   openButton.unexport();
//   closeButton.unexport();
//   openDoor.unexport();
//   closeDoor.unexport();
// });
