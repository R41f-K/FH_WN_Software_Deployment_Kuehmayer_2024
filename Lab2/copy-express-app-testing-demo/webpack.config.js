const path = require('path');

module.exports = {
  mode: 'production',
  entry: './app/server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
};