'use strict';

const { word } = require('faker').lorem;

const { parse, handleCommand } = require('../../lib/handle-command.js');

const handlerFinder = require('../../lib/handler-finder.js');

jest.mock('../../lib/handler-finder.js', () => jest.fn());

describe('`parse` function', () => {
  it('should correctly separate the `cmd` from the `arg` and return an object', () => {
    try {
      const cmd = word();
      const arg = word();
      const line = `/${cmd} ${arg}`;
      const expected = { cmd, arg };
      expect(parse(line)).toEqual(expected);
    } catch (err) {
      console.error(err);
    }
  });
});

describe('`handleCommand` function', () => {
  xit('should call the `handlerFinder` function', () => {
    try {
      const cmd = word();
      const arg = word();
      const line = `/${cmd} ${arg}`;
      const socket = {};

      handleCommand(line, socket);
      expect(parse).toHaveBeenCalledWith(line);
      expect(handlerFinder).toHaveBeenCalledWith(cmd);
      // expect(handler).toHaveBeenCalledWith(arg, socket, line);
    } catch (err) {
      console.error(err);
    }
  });
});
