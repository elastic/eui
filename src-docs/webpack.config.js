const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const getPort = require('get-port');
const deasync = require('deasync');

const { NODE_ENV, CI } = process.env;

const isDevelopment = NODE_ENV !== 'production' && CI == null;
const isProduction = NODE_ENV === 'production';
const bypassCache = NODE_ENV === 'puppeteer';

function employCache(loaders) {
  if (isDevelopment && !bypassCache) {
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
        loaders: employCache(['babel-loader']),
        exclude: [/node_modules/, /packages(\/|\\)react-datepicker/],
      },
      {
        // For IE11 and untranspiled node_modules
        test: /\.(js?)$/,
        use: () => {
          const ie11Loader = [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '2' }],
                ],
                sourceType: 'unambiguous',
              },
            },
          ];

          return isDevelopment && !bypassCache
            ? [{ loader: 'cache-loader' }, ...ie11Loader]
            : ie11Loader;
        },
        include: [
          /node_modules\/((lodash|html-format|vnopts|react-view|@babel\/code-frame|@babel\/template|@babel\/traverse|@babel\/parser|@babel\/core|@babel\/helper-annotate-as-pure|@babel\/generator|@babel\/helper-builder-react-jsx-experimental|@babel\/highlight|@babel\/plugin-syntax-jsx||@babel\/types|@miksu\/prettier|ansi-styles|chalk|gensync|is-fullwidth-code-point|jest-docblock|jsesc)\/).*/,
        ],
      },
      {
        test: /\.scss$/,
        loaders: employCache([
          'style-loader/useable',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: employCache(['style-loader/useable', 'css-loader']),
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
    // new ForkTsCheckerWebpackPlugin({
    //   tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
    //   async: false, // makes errors more visible, but potentially less performant
    // }),
  ],

  devServer: {
    contentBase: 'src-docs/build',
    host: '0.0.0.0',
    allowedHosts: ['*'],
    port: getPortSync({ port: getPort.makeRange(8030, 8130), host: '0.0.0.0' }),
    disableHostCheck: true,
    historyApiFallback: true,
  },
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
    .then(port => {
      isDone = true;
      freeport = port;
    })
    .catch(err => {
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
