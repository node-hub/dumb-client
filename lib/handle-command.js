'use strict';

const handlerFinder = require('./handler-finder.js');

const parse = line => {
  try {
    // Grab a case insensitive command
    const cmd = line.match(/[a-z]+\b/i)[0];
    // Grab the arguments
    const arg = line.slice(cmd.length + 2, line.length);
    // Return them
    return { cmd, arg };
  } catch (err) {
    console.error(err);
  }
};

const handleCommand = async (line, socket) => {
  try {
    // Parse the line for command and argument
    const { cmd, arg } = parse(line);
    // Pick the right handler based on the command
    const handler = await handlerFinder(cmd);
    // Use the handler to return the right result
    // The fallback sends the whole line to the server
    handler(arg, socket, line);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { parse, handleCommand };
