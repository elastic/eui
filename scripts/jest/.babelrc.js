module.exports = {
  "extends": "../../.babelrc.js",
  "presets": [
    ["@babel/env", {
      "targets": { "node": "current" }
    }],
  ],
  "plugins": [
    "dynamic-import-node"
  ],
};
