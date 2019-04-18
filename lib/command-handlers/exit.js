'use strict';

const emojic = require('emojic');
const log = require('../log.js');
/***
 * @param socket {object} The user's socket object
 ***/
const exit = (undefined, socket) => {
  try {
    socket.disconnect(true);
    log(`${emojic.smiley} Have a great day! ${emojic.wave}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

module.exports = exit;
