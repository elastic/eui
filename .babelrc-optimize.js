// See `wiki/consuming-eui/README.md` for rationale and consumer requirements.

const baseConfig = require('./.babelrc.js');
// Skip `propType` generation.
baseConfig.plugins.splice(
  baseConfig.plugins.indexOf(
    `${__dirname}/scripts/babel/proptypes-from-ts-props`
  ),
  1
);
// Transform runtimes using babel plugin.
// Requires consuming applications to use `@babel/runtime`.
baseConfig.plugins.push('@babel/plugin-transform-runtime');
baseConfig.env = {};
module.exports = baseConfig;
