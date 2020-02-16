//+++ Switch logic by type+++//
// Reed: If reed is closed, relay should wait 3 seconds before disabling itself. The door has been fully closed or oppened, and the relay disables itself to save energy.
// PushButton: Physical push button should open/close the door for the time pressed
// UIButton: App button, when pushed momentarily it opens/closes/freezes the door
const Gpio = require("onoff").Gpio;
const eventEmitter = require("../eventEmitter");

class PushButton extends Gpio {
  constructor(gpioPin) {
    super(gpioPin, "in", "both", { debounceTimeout: 100 });
    this.type = "PushButton";
    if (gpioPin) {
      this.watch((err, value) => {
        if (err) {
          throw err;
        }
        if (value === 1) {
          eventEmitter.emit("open", "PushButton", "open");
        }

        if (value === 0) {
          eventEmitter.emit("close", "PushButton", "close");
        }
      });
    } else {
      throw Error("No GPIO pin specified for the PushButton");
    }
  }
}

module.exports = PushButton;
