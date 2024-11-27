const path = require('path');

module.exports = {
  mode: 'production',
  entry: './app/server.js',
  output: {
    path: './dist',
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
};