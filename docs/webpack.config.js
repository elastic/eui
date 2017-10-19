const path = require('path');
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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
      exclude: /node_modules/
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
      test: /\.svg$/,
      loader: 'svg-sprite-loader'
    }, {
      test: /\.(woff|woff2|ttf|eot|ico)(\?|$)/,
      loader: 'file-loader',
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: 'body',
      cache: true,
      showErrors: true
    }),

    new SpriteLoaderPlugin()
  ],

  devServer: {
    contentBase: 'docs/build',
    host: 'localhost',
    port: 8020,
    disableHostCheck: true
  }
};
