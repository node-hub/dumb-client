'use strict';

let SERVER_URL = 'https://shrouded-everglades-62939.herokuapp.com';

if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://127.0.0.1:3000';
}

module.exports = SERVER_URL;
