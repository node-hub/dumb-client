'use strict';

const superagent = require('superagent');

const chalk = require('chalk');
const emojic = require('emojic');
const log = require('../log.js');

const SERVER_URL = require('../../server-url.js');
const appInfo = `${SERVER_URL}/api/v1/app-info`;

const list = () => {
  superagent
    .get(appInfo)
    .then(results => {
      const partying = chalk.bold.yellow(emojic.tada);
      const hundred = chalk.bold.red(emojic[100]);
      const message = chalk.underline('Apps from the Hubbub Community');
      const heading = `\n${partying} ${message} ${hundred}`;
      log(heading);
      results.body.forEach(entry => {
        const message = `${chalk.bold(entry.name)}: ${entry.description} | ${entry.url}`;
        log(message);
      });
      const directions = `\nType ${chalk.cyan('/launch `App Name`')} to launch a game!\n`;
      log(directions);
    })
    .catch(console.error);
};

module.exports = list;
