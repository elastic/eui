/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');

const plugins = [
  // Force EuiIcon's dynamic imports to be included in the single eui.js build,
  // instead of being split out into multiple files
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: ['istanbul'],
        },
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico|png|gif|jpg|jpeg)(\?|$)/,
        loader: 'file-loader',
      },
    ],
    strictExportPresence: false,
  },

  plugins,
};
