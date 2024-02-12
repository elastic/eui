const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const babelConfig = require('./.babelrc.js');
const { ProvidePlugin } = require('webpack');
const getPort = require('get-port');

const { NODE_ENV, CI, WEBPACK_SERVE } = process.env;

const isDevelopment = WEBPACK_SERVE === 'true' && CI == null;
const isProduction = NODE_ENV === 'production';
const isPuppeteer = NODE_ENV === 'puppeteer';

const useReactRefresh = isDevelopment && !isPuppeteer;

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

if (useReactRefresh) {
  babelConfig.plugins.push('react-refresh/babel');
}

const webpackConfig = new Promise(async (resolve, reject) => {
  try {
    const port = await getPort({
      port: getPort.makeRange(8030, 8130),
      host: '0.0.0.0',
    });

    resolve({
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
        alias: {
          '@faker-js/faker': '@faker-js/faker/locale/en',
        },
        fallback: {
          fs: false,
          os: false,
          process: require.resolve('process/browser'),
          // provide requirements for playground
          path: require.resolve('path'),
          buffer: require.resolve('buffer/'),
          assert: require.resolve('assert'),
        },
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
            use: employCache([
              {
                loader: 'babel-loader',
                options: { babelrc: false, ...babelConfig },
              },
            ]),
            exclude: [/node_modules/],
          },
          {
            test: /\.scss$/,
            use: employCache([
              {
                loader: 'style-loader',
                options: {
                  injectType: 'lazySingletonStyleTag',
                  insert: 'meta[name="sass-styles-compiled"]',
                },
              },
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ]),
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: employCache(['style-loader', 'css-loader']),
            exclude: /node_modules/,
          },
          {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            type: 'asset',
            generator: {
              filename: 'images/[hash]-[name][ext]',
            },
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024, // 8KB
              },
            },
          },
        ],
      },
      // Ignore Sass warnings - we won't be on Sass for much longer
      ignoreWarnings: [
        {
          module: /\.scss$/,
        },
        () => true,
      ],

      plugins: [
        // provide requirements for playground
        new ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),

        new HtmlWebpackPlugin({
          template: 'index.html',
          inject: 'body',
          cache: true,
          showErrors: true,
        }),

        new CircularDependencyPlugin({
          exclude: /node_modules|collapsible_nav_item/, // EuiCollapsibleNavItem is intentionally recursive to support any amount of nested accordion items
          failOnError: true,
        }),

        useReactRefresh && new ReactRefreshWebpackPlugin(),
      ].filter(Boolean),

      devServer: isDevelopment
        ? {
            host: '0.0.0.0',
            allowedHosts: ['*'],
            port,
            historyApiFallback: true,
          }
        : undefined,

      // prevent file watching while running on CI
      // /app/ represents the entire docker environment
      watchOptions: isPuppeteer
        ? {
            ignored: '**/*',
          }
        : undefined,

      optimization: {
        minimize: isProduction,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              // prevent Eui* function (component) names from being mangled,
              // as mangling prevents copy-pasteable component code from being generated
              keep_fnames: /^Eui[A-Z]/,
            },
          }),
        ],
      },

      stats: 'minimal',
    });
  } catch (e) {
    reject(e);
  }
});

module.exports = webpackConfig;
