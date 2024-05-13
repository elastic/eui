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
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
  }),
  // run TypeScript during webpack build
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.resolve(__dirname, '..', '..', '..', 'tsconfig.json'),
    },
    async: false, // makes errors more visible, but potentially less performant
  }),
];

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    guide: './themes.ts',
  },

  context: __dirname,

  output: {
    path: path.resolve(__dirname, '../../../dist'),
    filename: 'eui_charts_theme.js',
    library: {
      type: 'commonjs',
    },
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
    strictExportPresence: true,
  },

  plugins,
};
