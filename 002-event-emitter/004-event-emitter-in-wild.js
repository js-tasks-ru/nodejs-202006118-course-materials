const {Server} = require('http');

const server = new Server();

const buffer = [];

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
server.on('request', (req, res) => {
  buffer.push(Array.from({length: 1e6}, _ => 0))
  console.log('request');
  res.end('Hello');
});

server.once('listening', () => console.log('Server started'));

server.listen(3000);
