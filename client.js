'use strict';

// Environment
require('dotenv').config();

// Interface modules
const log = require('./lib/log.js');
const rl = require('./lib/readline-interface.js');

// Socket.io
const SERVER_URL = require('./server-url.js');
const io = require('socket.io-client');
let socket = io.connect(SERVER_URL);

log(`Client running on ${SERVER_URL}...`);

// client send one thing, payload from readline
rl.on('line', line => {
  if (line === '/exit') {
    log('Goodbye');
    socket.disconnect();
    socket = io.connect('http://localhost:3000');
  } else {
    socket.emit('input', line);
  }
  rl.prompt(true); // Show the readline prompt
});

// Client will accept and print any payload.display
socket.on('output', payload => {
  log(payload.display);
});
