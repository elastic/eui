const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const babelConfig = require('./.babelrc.js');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const getPort = require('get-port');
const deasync = require('deasync');

const { NODE_ENV, CI, WEBPACK_DEV_SERVER } = process.env;

const isDevelopment = WEBPACK_DEV_SERVER === 'true' && CI == null;
const isProduction = NODE_ENV === 'production';
const isPuppeteer = NODE_ENV === 'puppeteer';

function employCache(loaders) {
  if (isDevelopment && !isPuppeteer) {
    return [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.join(__dirname, '..', '.cache-loader'),
        },
      },
      ...loaders,
    ];
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

  resolveLoader: {
    alias: {
      'prop-loader': path.resolve(
        __dirname,
        '../scripts/loaders/prop-loader.js'
      ),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        loaders: employCache([
          {
            loader: 'babel-loader',
            options: { babelrc: false, ...babelConfig },
          },
        ]),
        exclude: [/node_modules/, /packages(\/|\\)react-datepicker/],
      },
      {
        test: /\.scss$/,
        loaders: employCache([
          {
            loader: 'style-loader',
            options: { injectType: 'lazySingletonStyleTag' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: employCache(['style-loader', 'css-loader']),
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)(\?|$)/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
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
      inject: 'body',
      cache: true,
      showErrors: true,
    }),

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),

    // run TypeScript during webpack build
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: { configFile: path.resolve(__dirname, '..', 'tsconfig.json') },
    //   async: false, // makes errors more visible, but potentially less performant
    // }),
  ],

  devServer: isDevelopment
    ? {
        contentBase: 'src-docs/build',
        host: '0.0.0.0',
        allowedHosts: ['*'],
        port: getPortSync({
          port: getPort.makeRange(8030, 8130),
          host: '0.0.0.0',
        }),
        disableHostCheck: true,
        historyApiFallback: true,
        // prevent file watching while running on CI
        // /app/ represents the entire docker environment
        watchOptions: isPuppeteer
          ? {
              ignored: '**/*',
            }
          : undefined,
      }
    : undefined,
  node: {
    fs: 'empty',
  },
};

// Inspired by `get-port-sync`, but propogates options
function getPortSync(options) {
  let isDone = false;
  let freeport = null;
  let error = null;

  getPort(options)
    .then((port) => {
      isDone = true;
      freeport = port;
    })
    .catch((err) => {
      isDone = true;
      error = err;
    });

  // wait until we're done'
  deasync.loopWhile(() => !isDone);

  if (error) {
    throw error;
  } else {
    return freeport;
  }
}

module.exports = webpackConfig;
