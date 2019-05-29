module.exports = {
  // We need to preserve comments as they are used by webpack for
  // naming chunks during code-splitting. The compression step during
  // bundling will remove them later.
  "comments": true,

  "presets": [
    ["@babel/env", {
      "targets": {
        "browsers": [
          "last 2 versions",
          "> 5%",
          "Safari 7" // for PhantomJS support
        ]
      },
      "useBuiltIns": "usage",
      "modules": process.env.BABEL_MODULES ? process.env.BABEL_MODULES : "commonjs" // babel's default is commonjs
    }],
    "@babel/typescript",
    "@babel/react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "pegjs-inline-precompile",
    "./scripts/babel/proptypes-from-ts-props",
    "add-module-exports",
    [
      "react-docgen",
      {
        "resolver": "findAllExportedComponentDefinitions"
      }
    ],
    // stage 3
    "@babel/proposal-object-rest-spread",
    // stage 2
    "@babel/proposal-class-properties",
    [
      "inline-react-svg",
      {
        "ignorePattern": "images/*",
        "svgo": {
          "plugins": [
            { "cleanupIDs": false },
            { "removeViewBox": false }
          ]
        }
      }
    ],
  ],

  "env": {
    "test": {
      "plugins": ["dynamic-import-node"]
    }
  }
};
