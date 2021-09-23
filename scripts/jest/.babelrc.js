module.exports = {
  "extends": "../../babel.config.js",
  "presets": [
    ["@babel/env", {
      "targets": { "node": "current" }
    }],
  ],
  "plugins": [
    "dynamic-import-node"
  ],
};
