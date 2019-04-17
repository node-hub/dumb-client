'use strict';

// Readline
const rl = require('./readline-interface.js');


// initial connect to chat server (hubbub)
// Socket.io
let SERVER_URL = 'https://afternoon-eyrie-23717.herokuapp.com';
const io = require('socket.io-client');
let socket = io.connect(SERVER_URL);


// client send one thing, payload from readline
rl.on('line', (line) => {
  // if(line === 'tic-tac-node'){
  //   socket.disconnect();
  //   socket = io.connect();
  // }

  //client needs an `exit` command that takes it back to chat server
  if(line === 'exit'){
    console.log('Goodbye');
    socket.disconnect();
    socket = io.connect('http://localhost:3000');
  }
  else {
    console.log(`Received: ${line}`);
    socket.emit('input', line);
  }
});

// client will accept an object from any ext app
// print object
socket.on('output', payload => {
  console.log(payload);
});



