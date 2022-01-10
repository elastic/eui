const baseConfig = require('./.babelrc.js');
const index = baseConfig.plugins.indexOf(
  './scripts/babel/proptypes-from-ts-props'
);
baseConfig.plugins.splice(
  index,
  1
);
baseConfig.plugins.push('@babel/plugin-transform-runtime');
baseConfig.env = {};
module.exports = baseConfig;