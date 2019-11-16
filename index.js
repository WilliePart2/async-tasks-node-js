require('./patch');
/**
 * Each iteration is separate macrotask
 * Macrotask consists from:
 * - next tick from previous task (if exists)
 * - promises from this task (if exists)
 * - registration next task from set timeout
 * - registration next task from set immediate
 *
 * Questions:
 * - registration enqueue microtask ???
 * - why setImmediate behave differently from time ti time ??
 *    + influence I/O operations
 *
 * Tips:
 * Structure of microtask:
 * - success case (then)
 * - error case (catch)
 *
 * Types of action which are performed by interpreter:
 * - registration of task
 * - execution of task
 *
 * Sequence of queues checked by event loops
 * - timers
 * - pending callbacks
 * - idle, prepare (for internal purposes)
 * - poll (literally the main queue)
 * - check
 * - close callbacks
 */

Promise.resolve() // create the first task
  .then(() => 1) // create the second task + return it
  .then(() => 2); // create the third task + return it

// next macrotask - 1
setTimeout(() => {

  Promise.resolve()
    .then(() => 7)
    .then(() => 8);

  Promise.resolve()
    .then(() => 10);

  // next macrotask - 3
  setImmediate(() => {});
});

process.nextTick(() => {
  Promise.resolve() // 4
    .then(() => 'next tick 1') // 5
    .then(() => 'next tick 2'); // 6
});

// next macrotask - 2
setImmediate(() => {
  Promise.resolve()
    .then(() => 12)
    .then(() => 13);
});
