module.exports = {
  // We need to preserve comments as they are used by webpack for
  // naming chunks during code-splitting. The compression step during
  // bundling will remove them later.
  "comments": true,

  "presets": [
    ["@babel/env", {
      // `targets` property set via `.browserslistrc`
      "useBuiltIns": process.env.NO_COREJS_POLYFILL ? false : "usage",
      "corejs": !process.env.NO_COREJS_POLYFILL ? '3.6' : undefined,
      "modules": process.env.BABEL_MODULES ? process.env.BABEL_MODULES === 'false' ? false : process.env.BABEL_MODULES : "commonjs" // babel's default is commonjs
    }],
    ["@babel/react", { runtime: 'classic' }],
    ["@babel/typescript", { isTSX: true, allExtensions: true, allowDeclareFields: true }],
    [
      "@emotion/babel-preset-css-prop",
      {
        "autoLabel": "always",
        "labelFormat": "[local]",
        "sourceMap": false,
      },
    ],
  ],
  "plugins": [
    `${__dirname}/scripts/babel/proptypes-from-ts-props`,
    "add-module-exports",
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
  // Used for Cypress code coverage - note that the env has to be Cypress-specific, otherwise Jest --coverage throws errors
  "env": {
    "cypress_test": {
      "plugins": ["istanbul"]
    }
  },
  "overrides": [
    {
      "include": `${__dirname}/src/components/search_bar/query/default_syntax.ts`,
      "plugins": ["pegjs-inline-precompile"],
    }
  ]
};
