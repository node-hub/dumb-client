'use strict';

// Environment
require('dotenv').config();
const superagent = require('superagent');

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
function clear() {
  console.clear();
}

function changeApp(game) {
  superagent
    .get(`${SERVER_URL}/api/v1/app-info/${game}`)
    .then(results => {
      let url = results.body[0].url;
      console.log(url);
      socket.disconnect(true);
      socket = io.connect(url);
      socket.on('output', log);
      socket.on('clear', clear);
    })
    .catch(() => {
      console.error('Game does not exist');
    });
}

function switchConnection(url) {
  socket.disconnect(true);
  socket = io.connect(url);
  socket.on('clear', console.clear);
  socket.on('output', log);
  socket.on('clear', clear);
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
    const launch = /^\/launch/gi;
    if (launch.test(line)) {
      let app = line.trim().slice(8);
      console.log(app);
      changeApp(app);
    } else if (line === '/lobby') {
      switchConnection(SERVER_URL);
    } else if (line === '/exit') {
      exitCommand();
    } else if (line === '/dev') {
      switchConnection('http://localhost:4444');
    } else {
      handleCommand(line, socket);
    }
  } else {
    socket.emit('input', line);
  }
  rl.prompt(true); // Show the readline prompt
}
