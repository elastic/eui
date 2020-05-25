/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
    tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
    async: false, // makes errors more visible, but potentially less performant
  }),

  // Force EuiIcon's dynamic imports to be included in the single eui.js build,
  // instead of being split out into multiple files
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

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
  },

  plugins,
};

if (isProduction) {
  const optimization = (module.exports.optimization =
    module.exports.optimization || {});
  optimization.minimizer = [
    new UglifyJsPlugin({
      uglifyOptions: {
        sourceMap: true,
      },
    }),
  ];
}
