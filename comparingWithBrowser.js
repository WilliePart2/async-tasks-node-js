const patch = require('./patch');
patch.config.promiseLogLevel = patch.logLevels.MINIMUM;

/**
 * In tis example from time to time we could catch the moment
 * when all the setTimeout (timers) are executed till exhausting
 * of the timers queue
 *
 * Even if we register a resolved promise in one of the set timeout,
 * promise's chain will not be executed as we could expect
 * and promise registration could be followed by another setTimeout
 */

setTimeout(() => console.log("timeout"));

Promise.resolve()
  .then(() => console.log("promise 1"))
  .then(() => console.log("promise 2"))
  .then(() => console.log("promise 3"))
  .then(() => console.log("promise 4"))
  .then(() =>
    setTimeout(() => {
      console.log("promise -> timeout");
    })
  );
 // .then(() => {
 //    ssetImmediate(() => console.log('promise -> immediate'));
 //  });


setTimeout(() => {
  Promise.resolve().then(() => {
    console.log("timeout -> promise");

    Promise.resolve()
      .then(() => console.log("timeout -> promise -> promise"))
      .then(() => console.log("timeout -> promise -> promise"))
      .then(() => console.log("timeout -> promise -> promise"))
      .then(() => console.log("timeout -> promise -> promise"));
  });
});
