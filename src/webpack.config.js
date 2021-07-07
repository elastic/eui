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
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
  }),
  // run TypeScript during webpack build
  new ForkTsCheckerWebpackPlugin({
    typescript: { configFile: path.resolve(__dirname, '..', 'tsconfig.json') },
    async: false, // makes errors more visible, but potentially less performant
  }),

  // Force EuiIcon's dynamic imports to be included in the single eui.js build,
  // instead of being split out into multiple files
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

const terserPlugin = new TerserPlugin({
  sourceMap: true,
});

module.exports = {
  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',

  entry: {
    guide: './index.js',
  },

  context: __dirname,

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `eui${isProduction ? '.min' : ''}.js`,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  // Specify where these libraries should be found
  externals: {
    moment: 'window.moment',
    'prop-types': 'window.PropTypes',
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
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
    strictExportPresence: isProduction,
  },

  plugins,

  optimization: {
    minimizer: isProduction ? [terserPlugin] : [],
  },
};
