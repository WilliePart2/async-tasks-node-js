const fs = require('fs');
const logger = require('../logger');

const trueReadFile = fs.readFile;
fs.readFile = (...args) => {
  const _logger = logger.getPollQueueLogger();
  _logger.log('register');

  const callback = args.pop();

  trueReadFile(...args, (...callbackArgs) => {
    _logger.log('fire');
    callback(...callbackArgs);
  })
};
