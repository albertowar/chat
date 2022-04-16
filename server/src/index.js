const WebSocketServer = require('websocket').server;
const http = require('http');

const connections = new Map();

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});

server.listen(8080, () => {
  console.log(`${new Date()} Server is listening on port 8080`);
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

wsServer.on('request', (request) => {
  const { user } = request.resourceURL.query;
  console.log(`${new Date()} An user entered the chat ${user}`);

  const connection = request.accept();

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log(`Received message: ${message.utf8Data}`);

      console.log(connections);

      connections.forEach((c, u) => {
        console.log(u);
        console.log(c);
        c.sendUTF(message.utf8Data);
      });
    } else if (message.type === 'binary') {
      console.log('Unsupported message type');
    }
  });

  connection.on('close', () => {
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
  });

  connections.set(user, connection);
});
