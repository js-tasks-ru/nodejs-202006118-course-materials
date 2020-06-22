console.log("console.log-1");

setTimeout(() => { console.log('setTimeout'); }, 1000);

console.log('console.log-2');


/**
 * stack: []
 * task: [setTimeout]
 */
