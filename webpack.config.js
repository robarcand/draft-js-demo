'use strict';

const { resolve } = require('path')

module.exports = {
    entry: ['babel-polyfill', './app/index'], // assumes your entry point is the index.js in the /app directory
    mode: 'development',
    output: {
      path: __dirname, // assumes your bundle.js will be in the ./public directory
      filename: './public/bundle.js'
    },
    devtool: 'source-maps',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: resolve(__dirname, './app'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }