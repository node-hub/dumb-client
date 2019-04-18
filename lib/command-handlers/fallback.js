'use strict';

const emojic = require('emojic');
const log = require('../log.js');

/***
 * Emits an `input` event with the line, if
 * no match for the command is found in the
 * client.
 * Control passes to server-side command
 * handling.
 *
 * @function
 * @name fallback
 * @param undefined {undefined} Unused parameter
 * @param line {string} User input
 * @param socket {object} The user's socket object
 ***/
const fallback = (undefined, socket, line) => {
  socket.emit('input', line);
};

module.exports = fallback;
