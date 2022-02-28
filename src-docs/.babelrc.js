const baseConfig = require('../.babelrc.js');
const index = baseConfig.plugins.indexOf(
  `${__dirname}/scripts/babel/proptypes-from-ts-props`
);
baseConfig.plugins.splice(
  index + 1,
  0,
  `${__dirname}/../scripts/babel/react-docgen-typescript`
);
module.exports = baseConfig;
