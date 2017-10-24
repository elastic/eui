const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new SpriteLoaderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = {
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',

  entry: {
    guide: './index.js'
  },

  context: __dirname,

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `eui${isProduction ? '.min' : ''}.js`
  },

  externals: {
    'react': true,
    'prop-types': true
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      exclude: /node_modules/
    }, {
      test: /\.svg$/,
      loader: 'svg-sprite-loader'
    }, {
      test: /\.(woff|woff2|ttf|eot|ico)(\?|$)/,
      loader: 'file-loader',
    }]
  },

  plugins
};
