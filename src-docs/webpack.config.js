const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { NODE_ENV, CI } = process.env;

const isDevelopment = NODE_ENV !== 'production' && CI == null;
const isProduction = NODE_ENV === 'production';

function useCache(loaders) {
  if (isDevelopment) {
    return ['cache-loader'].concat(loaders);
  }

  return loaders;
}

const webpackConfig = {
  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',

  entry: {
    bundle: './index.js',
  },

  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: `[name]${isProduction ? '.min' : ''}.js`,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        loaders: useCache(['babel-loader']), // eslint-disable-line react-hooks/rules-of-hooks
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: useCache([ // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
          'style-loader/useable',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: useCache(['style-loader/useable', 'css-loader']), // eslint-disable-line react-hooks/rules-of-hooks
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

    // run TypeScript during webpack build
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
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

module.exports = webpackConfig;
