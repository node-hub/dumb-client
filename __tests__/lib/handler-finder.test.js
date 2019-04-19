'use strict';

const { word } = require('faker').random;

const handlerFinder = require('../../lib/handler-finder.js');

describe('`handlerFinder`', () => {
  it('should return defined for any string argument', () => {
    const cmd = word();
    expect(handlerFinder(cmd)).toBeDefined();
  });
});

module.exports = handlerFinder;
