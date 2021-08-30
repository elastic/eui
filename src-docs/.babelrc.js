const baseConfig = require('../.babelrc.js');
const index = baseConfig.plugins.indexOf(
  './scripts/babel/proptypes-from-ts-props'
);
baseConfig.presets.push([
  '@emotion/babel-preset-css-prop',
  {
    labelFormat: '[local]',
  },
]);
baseConfig.plugins.splice(
  index + 1,
  0,
  './scripts/babel/react-docgen-typescript'
);
module.exports = baseConfig;
