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
  // run TypeScript and tslint during webpack build
  new ForkTsCheckerWebpackPlugin({
    tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
    tslint: path.resolve(__dirname, '..', 'tslint.yaml'),
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
    guide: './index.js'
  },

  context: __dirname,

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `eui${isProduction ? '.min' : ''}.js`
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  // Specify where these libraries should be found
  externals: {
    'moment': 'window.moment',
    'prop-types': 'window.PropTypes',
    'react': 'window.React',
    'react-dom': 'window.ReactDOM'
  },

  module: {
    rules: [{
      test: /\.(js|tsx?)$/,
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

if (isProduction) {
  const optimization = module.exports.optimization = module.exports.optimization || {};
  optimization.minimizer = [
    new UglifyJsPlugin({
      uglifyOptions: {
        sourceMap: true,
      }
    })
  ];
}
