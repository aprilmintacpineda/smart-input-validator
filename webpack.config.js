const webpack = require('webpack');

module.exports = [
  {
    name: 'javascript',
    entry: __dirname + '/src/entry.js',
    output: {
      filename: 'index.js',
      path: __dirname
    },
    module: {
      loaders: [
        {
          test: /\.js/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
];