const logger = require('../logger');

const trueQueueMicrotask = global.queueMicrotask;
global.queueMicrotask = (fn, ...args) => {
  const _logger = logger.getQueueMicrotaskLogger();
  _logger.log('register');

  trueQueueMicrotask(() => {
    _logger.log('fire');
    fn();
  }, ...args);
};
