const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
  }),
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

  // Specify where these libraries should be found
  externals: {
    'moment': 'window.moment',
    'prop-types': 'window.PropTypes',
    'react': 'window.React',
    'react-dom': 'window.ReactDOM'
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
      test: /\.(woff|woff2|ttf|eot|ico|png|gif|jpg|jpeg)(\?|$)/,
      loader: 'file-loader',
    }]
  },

  plugins
};
