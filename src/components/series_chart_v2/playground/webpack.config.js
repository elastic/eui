const path = require('path');
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    chart: './basic.tsx',
  },

  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, '../chart_playground'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts',  '.js'],
  },

  module: {
    loaders: [
      {
        test: /\.ts|\.tsx$/,
        loader: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)(\?|$)/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: 'images/[hash]-[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: 'body',
      cache: true,
      showErrors: true,
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ],

  devServer: {
    contentBase: 'chart_playground/build',
    host: '0.0.0.0',
    port: 8034,
    disableHostCheck: true,
  },
};
