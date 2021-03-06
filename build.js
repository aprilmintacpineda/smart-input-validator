/** @format */

const babelCore = require('@babel/core');
const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, '/src/index.js'), 'utf8');
const code = babelCore.transform(source, {
  babelrc: false,
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-syntax-object-rest-spread'],
  comments: false
}).code;
const codeMin = babelCore.transform(source, {
  babelrc: false,
  presets: ['@babel/preset-env', 'minify'],
  plugins: ['@babel/plugin-syntax-object-rest-spread'],
  comments: false
}).code;

fs.writeFileSync(path.join(__dirname, '/lib/index.js'), code, 'utf8');
fs.writeFileSync(path.join(__dirname, '/lib/index.min.js'), codeMin, 'utf8');
