// Garage signal decision controller
//+++ Switch logic by type+++//
// Reed switch: If reed is closed, relay should wait 5 seconds before disabling itself. The door has been fully closed or oppened, and the relay disables itself to save energy.
// PushButton switch: Physical push button should open/close the door for the time pressed
// UIButton: App button, when pushed momentarily it opens/closes/freezes the door

const Gpio = require("onoff").Gpio;
const eventEmitter = require("./eventEmitter");

class DoorController {
  constructor() {
    this.openButton = new Gpio(3, "in", "both", { debounceTimeout: 100 });
    this.closeButton = new Gpio(2, "in", "both", { debounceTimeout: 100 });
    this.relayClose = new Gpio(8, "high");
    this.relayOpen = new Gpio(7, "high");
    // this.reedSwitchTop = new Gpio(23, "in", "falling", {
    //   debounceTimeout: 100
    // });
    // this.reedSwitchBottom = new Gpio(24, "in", "falling", {
    //   debounceTimeout: 100
    // });
    eventEmitter.on("open", (event) => this.direction(event));
    eventEmitter.on("close", (event) => this.direction(event));
    eventEmitter.on("freeze", (event) => this.direction(event));
    this.state = 0;
    this.timer = 0;

    this.openButton.watch((err, value) => {
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

    this.closeButton.watch((err, value) => {
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

    // reedSwitchTop.watch((err, value) => {
    //   if (err) {
    //     throw err;
    //   }
    //   if (value === 0) {
    //     setTimeout(() => eventEmitter.emit("freeze", "freeze"), 5000);
    //   }

    //   console.log(`Top Reed Switch activated! value: ${value}`);
    // });

    // reedSwitchBottom.watch((err, value) => {
    //   if (err) {
    //     throw err;
    //   }
    //   if (value === 0) {
    //     setTimeout(() => eventEmitter.emit("freeze", "freeze"), 5000);
    //   }
    //   console.log(`Bottom Reed Switch activated! value: ${value}`);
    // });
  }

  direction(event) {
    if (!event) {
      return;
    }
    this.clearTimer();

    if (event === "open") {
      this.state++;
      this.setTimer();
    }
    if (event === "close") {
      this.state--;
      this.setTimer();
    }
    if (event === "freeze") {
      this.state = 0;
    }
    this.fixRange();

    if (this.state === 1) {
      setTimeout(() => this.relayOpen.writeSync(0), 100);
      setTimeout(() => this.relayClose.writeSync(1), 100);
    } else if (this.state === -1) {
      setTimeout(() => this.relayOpen.writeSync(1), 100);
      setTimeout(() => this.relayClose.writeSync(0), 100);
    } else {
      this.relayOpen.writeSync(1);
      this.relayClose.writeSync(1);
    }
  }

  clearTimer() {
    clearTimeout(this.timer);
  }

  setTimer() {
    this.timer = setTimeout(() => {
      eventEmitter.emit("freeze", "freeze");
    }, 60000);
  }

  fixRange() {
    this.state = this.state > 1 ? 1 : this.state < -1 ? -1 : this.state;
  }

  // exit() {
  //   process.on("SIGINT", _ => {
  //     this.openButton.unexport();
  //     this.closeButton.unexport();
  //     this.relayOpen.unexport();
  //     this.relayClose.unexport();
  //   });
  // }
}

module.exports = DoorController;
