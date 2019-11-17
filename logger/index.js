const { colors, queueNames } = require('./constants');

let promisesCounter = 0;
let checkCallbacksCounter = 0;
let timersCallbacksCounter = 0;
let pollCallbacksCounter = 0;
let nextTickCounter = 0;

class Index {
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
      case queueNames.PROMISE:
        --promisesCounter;
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
    return new Index(
      ++promisesCounter,
      '[MICROTASK]',
      colors.FgYellow
    );
  },
  getCheckQueueLogger() {
    return new Index(
      ++checkCallbacksCounter,
      '[CHECK - SET IMMEDIATE]',
      colors.FgGreen
    );
  },
  getTimersQueueLogger() {
    return new Index(
      ++timersCallbacksCounter,
      '[TIMERS - SET TIMEOUT]',
      colors.FgBlue
    );
  },
  getPollQueueLogger() {
    return new Index(
      ++pollCallbacksCounter,
      '[POLL - FILESYSTEM]',
      colors.FgCyan
    );
  },
  getNextTickQueueLogger() {
    return new Index(
      ++nextTickCounter,
      '[PENDING - NEXT-TICK]',
      colors.FgRed
    );
  }
};
module.exports.queueNames = queueNames;
