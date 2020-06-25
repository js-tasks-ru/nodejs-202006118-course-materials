const {Server} = require('http');

const server = new Server();

server.on('request', (req /*http.IncomingMessage*/, res /*http.ServerResponse*/) => {
  // const chunks = [];
  // req.on('data', chunk => {
  //   chunks.push(chunk)
  // });
  //
  // req.on('end', () => {
  //   console.log(JSON.parse(Buffer.concat(chunks).toString('utf-8')));
  //   res.end();
  // });
  //

  req.pipe(res);
});

server.listen(3000);
