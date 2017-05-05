// Register babel to have ES6 support on the server
require('babel-core/register');

// fetch polyfill for node
require('isomorphic-fetch');

// Start the server
require('./server');
