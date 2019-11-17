const { config, logLevels } = require('./config');
require('./patchNextTick');
require('./patchPromise');
require('./patchSetTimeout');
require('./pathSetImmediate');
require('./pathFs');
require('./queueMicrotaskPath');

module.exports = {
  config,
  logLevels,
};
