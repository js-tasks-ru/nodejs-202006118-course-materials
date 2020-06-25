const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME);

readStream.once('close', () => {
  console.log("Stream closed");
});

(async function () {

  let totalSize = 0;
  for await (let chunk of readStream) {
    console.log(`Read ${chunk.length} bytes`);
    totalSize += chunk.length;
  }
  console.log(`Total size: ${totalSize}`);

})()
  .catch(error => {
    console.log(error);
  });

// const a = {
//   [Symbol.iterator]: function* () {
//     yield 1;
//     yield 2;
//     yield 3;
//   },
//   [Symbol.asyncIterator]: async function* () {
//     yield 4;
//     yield 5;
//     yield 6;
//   }
// }
//
//
// for (const el of a) {
//   console.log(el);
// }
//
// (async function () {
//   for await (const el of a) {
//     console.log(el);
//   }
// })()
//
