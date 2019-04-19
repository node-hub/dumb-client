'use strict';

// Environment
require('dotenv').config();

// Set server url based on .env
const SERVER_URL = require('./server-url.js'); // if NODE_ENV=development, use localhost:3000

// Command logic
const { handleCommand } = require('./lib/handle-command.js');

// Interface modules
const emojic = require('emojic');
const log = require('./lib/log.js');
const rl = require('./lib/readline-interface.js');

// Socket.io
const io = require('socket.io-client');
let socket = io.connect(SERVER_URL);

log(`Client running on ${SERVER_URL}...`);

// Client will accept a line and pass it to handlers
rl.on('line', handleLine);

// Client will accept and print
// any payload.display
socket.on('output', log);

socket.on('clear', console.clear);

rl.on('close', handleReadlineClose);

// Helper functions
function switchConnection(url) {
  socket.disconnect(true);
  socket = io.connect(url);
  socket.on('clear', console.clear);
  socket.on('output', log);
}

function exitCommand() {
  socket.disconnect(true);
  rl.close();
}

function handleReadlineClose() {
  log(`${emojic.smiley} Have a great day! ${emojic.wave}`);
  process.exit(0);
}

function handleLine(line) {
  if (line[0] === '/' && line.length > 1) {
    const launch = /^\/launch http.{7,}/gi;
    if (launch.test(line)) {
      const url = line.trim().split(' ')[1];
      switchConnection(url);
    } else if (line === '/lobby') {
      switchConnection(SERVER_URL);
    } else if (line === '/exit') {
      exitCommand();
    } else {
      handleCommand(line, socket);
    }
  } else {
    socket.emit('input', line);
  }
  rl.prompt(true); // Show the readline prompt
}
