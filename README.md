# Chat app

This is a proof of concept chat app that I used to get familiar with websockets.

## Repository structure

### Client

This is a React.js app built with Material UI.

You can find instructions on how to run it under [`/client/README.md`](/client/README.md).

This is how it looks ![image](https://user-images.githubusercontent.com/15969015/163716882-20d98318-def6-4a66-a92a-09cef8435b46.png)

### Server

This is a node.js app that collects the messages sent by the chat app users and broadcasts them back to all connected users.

To start the server, you can open a terminal and run `node server/index.js`.

## Dependencies

- NPM
- Node.js
