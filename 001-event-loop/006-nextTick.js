
setTimeout(() => {
  console.log('setTimeout-1');
}, 10);

setImmediate(() => {
   console.log('setImmediate');
});

queueMicrotask(() => {
  console.log('queueMicrotask-1');
});

process.nextTick(() => {
  console.log('nextTick');
});
//setTimeout(fn, 0)

/**
 * stack: []
 * timers: [setTimeout]
 * setImmediate: [sI]
 * micro: [qM]
 * nextTick: [nT]
 *
 */
