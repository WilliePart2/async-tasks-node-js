const { logLevels } = require('./constants');

const config = {
  promiseLogLevel: logLevels.FULL,
};

module.exports = {
  logLevels,
  config,
};
