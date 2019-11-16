const patch = require('./patch');

/**
 * order of tasks will be not determined
 */

// timers callback queue
setTimeout(() => {});
setTimeout(() => {});
setTimeout(() => {});
setTimeout(() => {});
setTimeout(() => {});
setTimeout(() => {});

// check callback queue
setImmediate(() => {});
setImmediate(() => {});
setImmediate(() => {});
setImmediate(() => {});
setImmediate(() => {});
setImmediate(() => {});
