//Event singleton

const EventEmitter = require("events").EventEmitter;

const eventEmitter = new EventEmitter();

module.exports = eventEmitter;
