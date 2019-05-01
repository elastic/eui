const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDevelopment =
  process.env.NODE_ENV !== 'production' && process.env.CI == null;

function useCache(loaders) {
  if (isDevelopment) {
    return ['cache-loader'].concat(loaders);
  }

  return loaders;
}

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    guide: './index.js',
  },

  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        loaders: useCache(['babel-loader']),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: useCache([
          'style-loader/useable',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: useCache(['style-loader/useable', 'css-loader']),
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

    // run TypeScript and tslint during webpack build
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
      tslint: path.resolve(__dirname, 'tslint.yaml'),
      async: false, // makes errors more visible, but potentially less performant
    }),
  ],

  devServer: {
    contentBase: 'src-docs/build',
    host: '0.0.0.0',
    allowedHosts: ['*'],
    port: 8030,
    disableHostCheck: true,
  },
};
