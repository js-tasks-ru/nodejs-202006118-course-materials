setTimeout(() => {
  console.log('setTimeout-1');
  Promise.resolve().then(
    () => {
      console.log('queueMicrotask-1');
    }
  );
}, 0);

setTimeout(() => {
  console.log('setTimeout-2');
  queueMicrotask(() => {
    console.log('queueMicrotask-2');
  });
}, 0);

/**
 * stack: [st1]
 * timers: [st2]
 * micro: [qm1]
 */
