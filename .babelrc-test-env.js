module.exports = {
  "extends": "./babel.config.js",
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-syntax-dynamic-import",
    "dynamic-import-node"
  ],
};
