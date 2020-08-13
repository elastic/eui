const baseConfig = require("../.babelrc.js");
const index = baseConfig.plugins.indexOf("./scripts/babel/proptypes-from-ts-props");
const plugins = [...baseConfig.plugins];
plugins.splice(index + 1, 0, "./scripts/babel/react-docgen-typescript")
module.exports = {
  ...baseConfig,
  plugins,
};
