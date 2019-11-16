const { config, logLevels } = require('./patch');
const fs = require('fs');
const path = require('path');

config.promiseLogLevel = logLevels.MINIMUM;

/**
 * will be always first registered and executed
 */
setTimeout(() => {});

/**
 * I/O task will put callback into 'poll' queue as will be ready
 */
const readFileAsync = callback => {
  fs.readFile(path.join(__dirname, './afterIO.txt'), 'utf8', (err, data) => {
    if (err) return console.error(err);
    callback(data);
  });
};

readFileAsync((data) => {
  console.log(data);

  /**
   * belongs to nextTickQueue
   * this batch will be executed directly after operation
   * operation - executing callback for some underlying task, usually it's I/O
   */
  process.nextTick(() => {}); // mysterious thing!
  process.nextTick(() => {}); // mysterious thing!

  // will be set into 'timers' callback queue
  setTimeout(() => setTimeout(() => {}));
  setTimeout(() => setTimeout(() => {}));
  setTimeout(() => setTimeout(() => {}));

  // will be set into 'check' callback queue
  setImmediate(() => readFileAsync(() => {
    setTimeout(() => {});
  }));
  /**
   * Here interesting behavior
   * Due to we registered it from another setImmediate their behavior similar to that
   * if we register setImmediate from initial script in other words isn't determined
   */
  setImmediate(() => setImmediate(() => {}));
  setImmediate(() => setImmediate(() => {}));

  setTimeout(() => {
    Promise.resolve()
      .then(() => {
        Promise.resolve()
          .then(() => {});
      });
  });
});
