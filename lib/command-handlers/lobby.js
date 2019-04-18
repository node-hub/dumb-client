'use strict';

const log = require('./log.js');

const lobby = (socket, io) => {
  socket.disconnect();
  socket = io.connect(SERVER_URL);
  socket.on('output', log);
};

module.exports = lobby;
