const path = require('path');
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    guide: './index.js'
  },

  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loaders: ['style-loader/useable', 'css-loader', 'postcss-loader', 'sass-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style-loader/useable', 'css-loader'],
      exclude: /node_modules/
    }, {
      test: /\.(woff|woff2|ttf|eot|ico)(\?|$)/,
      loader: 'file-loader',
    }, {
      test: /\.(png|jp(e*)g|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 8000, // Convert images < 8kb to base64 strings
        name: 'images/[hash]-[name].[ext]'
      },
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: 'body',
      cache: true,
      showErrors: true
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ],

  devServer: {
    contentBase: 'src-docs/build',
    host: 'localhost',
    port: 8030,
    disableHostCheck: true
  }
};
