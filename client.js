'use strict';

// Environment
require('dotenv').config();
const superagent = require('superagent');

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
  if (line === '/list') {
    superagent
      .get('https://shrouded-everglades-62939.herokuapp.com/api/v1/app-info')
      .then(results => {
        results.body.forEach(entry => {
          console.log(entry.name, ' : ', entry.url);
        });
      })
      .catch(console.error);
  } else if (line.trim().split(' ')[0] === '/launch') {
    socket.disconnect();
    socket = io.connect(line.trim().split(' ')[1]);
    socket.on('output', log);
  } else if (line === '/lobby') {
    socket.disconnect();
    socket = io.connect(SERVER_URL);
    socket.on('output', log);
  } else if (line === '/exit') {
    socket.disconnect();
    log('Goodbye');
    rl.close();
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
