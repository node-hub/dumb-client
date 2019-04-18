'use strict';

const handlerFinder = cmd => {
  try {
    const handler = require(`./command-handlers/${cmd}.js`);
    return handler;
  } catch (err) {
    const handler = require('./command-handlers/fallback.js');
    return handler;
  }
};

module.exports = handlerFinder;
