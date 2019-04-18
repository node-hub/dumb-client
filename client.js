'use strict';

// Environment
require('dotenv').config();

// Set server url based on env
const SERVER_URL = require('./server-url.js'); // if NODE_ENV=development, use localhost:3000

// Command logic
const handleCommand = require('./lib/handle-command.js');

// Interface modules
const log = require('./lib/log.js');
const rl = require('./lib/readline-interface.js');

// Socket.io
const io = require('socket.io-client');
let socket = io.connect(SERVER_URL);

log(`Client running on ${SERVER_URL}...`);

// client send one thing, payload from readline
rl.on('line', line => {
  if (line[0] === '/' && line.length > 1) {
    const regex = /^\/launch\ http.{7,}/gi;
    if (regex.test(line)) {
      socket.disconnect(true);
      const url = line.split(' ')[1];
      console.log('urur:', url);
      socket = io.connect(url);
      socket.on('output', log);
    } else {
      handleCommand(line, socket);
    }
  } else {
    socket.emit('input', line);
  }
  rl.prompt(true); // Show the readline prompt
});

// Client will accept and print any payload.display
socket.on('output', log);

rl.on('close', () => {
  process.exit(0);
});
