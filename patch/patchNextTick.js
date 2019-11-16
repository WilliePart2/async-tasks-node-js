const logger = require('../logger');

const trueProcess = global.process;
global.process = {
  nextTick(callback, ...args) {
    const _logger = logger.getNextTickQueueLogger();
    _logger.log('register');

    trueProcess.nextTick(() => {
      _logger.log('fire');
      callback();
    }, ...args);
  }
};
