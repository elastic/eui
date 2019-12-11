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
  mode: 'development',

  devtool: 'source-map',

  entry: {
    guide: './testenv.js',
  },

  context: __dirname,

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'testenv.js',
    libraryTarget: 'commonjs',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    mainFiles: ['index.testenv', 'index'],
  },

  // Specify where these libraries should be found
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },

  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        use: {
          loader: 'babel-loader',
        },
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
