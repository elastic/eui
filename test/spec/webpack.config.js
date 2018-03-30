const { resolve } = require('path');

module.exports = {
  context: __dirname,
  entry: {
    table: './components/table/resources/table.js',
    card: './components/card/resources/card.js'
},
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/build/'
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
  devServer: {
    port: 9999
  },
};
