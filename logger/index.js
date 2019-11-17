const { colors, queueNames } = require('./constants');

let microtaskCounter = 0;
let checkCallbacksCounter = 0;
let timersCallbacksCounter = 0;
let pollCallbacksCounter = 0;
let nextTickCounter = 0;

class Logger {
  constructor(counter, label, color) {
    this.counter = counter;
    this.label = label;
    this.color = color;
  }

  log(message) {

    console.log(
      `${this.color}%s${colors.Reset}`,
      `${this.label} (${this.counter}) -` + message
    );
  }
}

module.exports = {
  decreaseQueueCounter(queueName) {
    switch (queueName) {
      case queueNames.QUEUE_MICROTASK:
      case queueNames.PROMISE:
        --microtaskCounter;
        break;
      case queueNames.CHECK:
        --checkCallbacksCounter;
        break;
      case queueNames.TIMERS:
        --timersCallbacksCounter;
        break;
      case queueNames.NEXT_TICK:
        --nextTickCounter;
        break;
      case queueNames.POLL:
        --pollCallbacksCounter;
        break;
    }
  },
  // to what heck they are set????
  getPromisesQueueLogger() {
    return new Logger(
      ++microtaskCounter,
      '[MICROTASK - PROMISE]',
      colors.FgYellow
    );
  },
  getQueueMicrotaskLogger() {
    return new Logger(
      ++microtaskCounter,
      '[MICROTASK - QUEUE MICROTASK]',
      colors.FgMagenta
    );
  },
  getCheckQueueLogger() {
    return new Logger(
      ++checkCallbacksCounter,
      '[CHECK - SET IMMEDIATE]',
      colors.FgGreen
    );
  },
  getTimersQueueLogger() {
    return new Logger(
      ++timersCallbacksCounter,
      '[TIMERS - SET TIMEOUT]',
      colors.FgBlue
    );
  },
  getPollQueueLogger() {
    return new Logger(
      ++pollCallbacksCounter,
      '[POLL - FILESYSTEM]',
      colors.FgCyan
    );
  },
  getNextTickQueueLogger() {
    return new Logger(
      ++nextTickCounter,
      '[PENDING - NEXT-TICK]',
      colors.FgRed
    );
  }
};
module.exports.queueNames = queueNames;
