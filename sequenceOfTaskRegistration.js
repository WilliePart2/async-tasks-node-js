const path = require('./patch');
path.promiseLogLevel = path.logLevels.MINIMUM;

// 1
Promise.resolve()
  .then(() => {

    Promise.resolve()
      .then(() => {

        Promise.resolve()
          .then(() => {});
      });

    setTimeout(() => {});
    setTimeout(() => {});
    setTimeout(() => {});
    setTimeout(() => {});

    setImmediate(() => {});
  });

/**
 * Here behavior vary
 * next promise could be fired either directly after parent promise or after series of setTimeout
 */
setTimeout(() => {
  Promise.resolve()
    .then(() => {
      Promise.resolve()
        .then();
    })
});

// 3 ???
setImmediate(() => {});

