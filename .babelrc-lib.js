const fs = require('fs');
const json5 = require('json5');

// load our base babel configuration
const baseConfig = json5.parse(fs.readFileSync('.babelrc').toString());

// set preset-env's `modules` config to commonjs
baseConfig
  .presets.find(preset => Array.isArray(preset) && preset[0] === '@babel/env')
  [1].modules = 'commonjs';

module.exports = baseConfig;
