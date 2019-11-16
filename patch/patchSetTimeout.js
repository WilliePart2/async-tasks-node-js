const logger = require('../logger');

const trueSetTimeout = global.setTimeout;
global.setTimeout = (fn, timeout) => {
  const _logger = logger.getTimersQueueLogger();
  _logger.log('register');

  return trueSetTimeout(() => {
    _logger.log('fire');
    return fn();
  }, timeout);
};
