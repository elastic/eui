import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import babelConfig from './.babelrc.js';
import Webpack from 'webpack';
import getPort from 'get-port';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        fallback: {
          fs: false,
          os: false,
          process: await import.meta.resolve('process/browser.js'),

          // provide requirements for playground
          path: await import.meta.resolve('path'),
          buffer: await import.meta.resolve('buffer/'),
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
            use: {
              loader: 'url-loader',
              options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]',
              },
            },
          },
          {
            test: /\.mdx$/,
            use: [
              {
                loader: '@mdx-js/loader',
                options: {
                  providerImportSource: '@mdx-js/react',
                  remarkPlugins: [remarkGfm],
                },
              },
            ],
          },
        ],
      },

      plugins: [
        // provide requirements for playground
        new Webpack.ProvidePlugin({
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
          exclude: /node_modules/,
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

export default webpackConfig;
