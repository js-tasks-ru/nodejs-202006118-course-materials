const fs = require('fs');
console.log('start'); // 1

new Promise((resolve, reject) => {
  console.log('new Promise'); // 2
  resolve();
}).then(_ => console.log('then-1'))  // 7
  .then(_ => console.log('then-2')); // 8

setTimeout(_ => console.log('setTimeout'), 0); // 9

fs.open(__filename, _ => {
  console.log('fs.open'); // 10
  queueMicrotask(_ => {
    console.log('queueMicrotask-1'); // 11
    queueMicrotask(_ => {
      console.log('queueMicrotask-2'); // 12
    })
  });
});

process.nextTick(_ => {
  console.log('nextTick-1'); // 4
  process.nextTick(_ => console.log('nextTick-2')); // 5
});

console.log('end'); // 3
