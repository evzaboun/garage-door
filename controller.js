// Garage signal decision controller
//+++ Switch logic by type+++//
// Reed switch: If reed is closed, relay should wait 5 seconds before disabling itself. The door has been fully closed or oppened, and the relay disables itself to save energy.
// PushButton switch: Physical push button should open/close the door for the time pressed
// UIButton: App button, when pushed momentarily it opens/closes/freezes the door

const Gpio = require("onoff").Gpio;
const eventEmitter = require("./eventEmitter");
const openButton = new Gpio(6, "in", "both", { debounceTimeout: 100 });
const closeButton = new Gpio(5, "in", "both", { debounceTimeout: 100 });
const reedSwitchTop = new Gpio(23, "in", "falling", { debounceTimeout: 100 });
const reedSwitchBottom = new Gpio(24, "in", "falling", {
  debounceTimeout: 100
});
const relayClose = new Gpio(27, "high");
const relayOpen = new Gpio(22, "high");
let state = 0;

eventEmitter.on("open", event => direction(event));
eventEmitter.on("close", event => direction(event));
eventEmitter.on("freeze", event => direction(event));

reedSwitchTop.watch((err, value) => {
  if (err) {
    throw err;
  }
  if (value === 0) {
    setTimeout(() => eventEmitter.emit("freeze", "freeze"), 5000);
  }
  console.log(`Top Reed Switch activated! value: ${value}`);
});

reedSwitchBottom.watch((err, value) => {
  if (err) {
    throw err;
  }
  if (value === 0) {
    setTimeout(() => eventEmitter.emit("freeze", "freeze"), 5000);
  }
  console.log(`Bottom Reed Switch activated! value: ${value}`);
});

openButton.watch((err, value) => {
  if (err) {
    throw err;
  }
  if (value === 0) {
    eventEmitter.emit("open", "open");
    console.log(`Open push button pressed`);
  }

  if (value === 1) {
    eventEmitter.emit("freeze", "freeze");
  }
});

closeButton.watch((err, value) => {
  if (err) {
    throw err;
  }
  if (value === 0) {
    eventEmitter.emit("close", "close");
    console.log(`Close push button pressed`);
  }

  if (value === 1) {
    eventEmitter.emit("freeze", "freeze");
  }
});

const fixRange = () => {
  state = state > 1 ? 1 : state < -1 ? -1 : state;
};

const direction = event => {
  if (event === "open") {
    state++;
  }
  if (event === "close") {
    state--;
  }
  if (event === "freeze") {
    state = 0;
  }
  fixRange();

  if (state === 1) {
    setTimeout(() => relayOpen.writeSync(0), 100);
    setTimeout(() => relayClose.writeSync(1), 100);
  } else if (state === -1) {
    setTimeout(() => relayOpen.writeSync(1), 100);
    setTimeout(() => relayClose.writeSync(0), 100);
  } else {
    relayOpen.writeSync(1);
    relayClose.writeSync(1);
  }
};

//setInterval(() => console.log(state), 1000);

process.on("SIGINT", _ => {
  openButton.unexport();
  closeButton.unexport();
  relayOpen.unexport();
  relayClose.unexport();
});
