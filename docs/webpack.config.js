const path = require('path');
const babelWebpackPreset = require('../build/babel-webpack-preset');
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  devtool: 'source-map',

  entry: {
    guide: './index.js'
  },

  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  // These are necessasry for using Enzyme with Webpack (https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md).
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [babelWebpackPreset],
      },
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      exclude: /node_modules/
    }, {
      test: /\.useable\.css$/,
      loaders: ['style-loader/useable', 'css-loader'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      exclude: /node_modules/
    }, {
      test: /\.(woff|woff2|ttf|eot|svg|ico)(\?|$)/,
      loader: 'file-loader',
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `index.html`,
      inject: `body`,
      cache: true,
      showErrors: true
    })
  ]
};
