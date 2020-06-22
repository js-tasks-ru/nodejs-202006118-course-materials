function promise() {
  return Promise.resolve()
    .then(promise)
}

function nextTick() {
  process.nextTick(nextTick)
}
// nextTick();

setTimeout(_ => {
  console.log('timeout');
});
promise();


console.log('end');
