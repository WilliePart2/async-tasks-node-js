const patch = require('./patch');
patch.config.promiseLogLevel = patch.logLevels.MINIMUM;
// add task to the global task queue
setTimeout(() => {});

// add tasks to the operation-level tasks queue

process.nextTick(() => {});

Promise.resolve().then();
Promise.resolve().then();

queueMicrotask(() => {});
queueMicrotask(() => {});
