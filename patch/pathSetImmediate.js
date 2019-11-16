const logger = require('../logger');

const trueSetImmediate = global.setImmediate;
global.setImmediate = (fn) => {
  const _logger = logger.getCheckQueueLogger();
  _logger.log('register');

  return trueSetImmediate(() => {
    _logger.log('fire');
    fn();
  });
};
