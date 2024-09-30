/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const { ProvidePlugin, DefinePlugin } = require('webpack');

const alias = {};
const reactVersion = process.env.REACT_VERSION || '18';

// Setup module aliasing when we're testing an older React version
if (['16', '17'].includes(reactVersion)) {
  alias.react = `react-${reactVersion}`;
  alias['react-dom'] = `react-dom-${reactVersion}`;
}

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  stats: 'minimal',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      fs: false,
      os: false,
      process: require.resolve('process/browser'),
    },
    alias,
  },

  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        sideEffects: true, // tells webpack not to tree shake `import './'` lines
        options: {
          plugins: ['istanbul'],
        },
      },
    ],
    strictExportPresence: false,
  },

  plugins: [
    new ProvidePlugin({
      process: 'process/browser',
    }),

    new DefinePlugin({
      'process.env.REACT_VERSION': JSON.stringify(reactVersion),
    }),
  ],
};
