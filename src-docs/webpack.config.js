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

function useCache(loaders) {
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

  module: {
    rules: [
      {
        test: /\.(jsx|ts|js|tsx?)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-destructuring',
            ],
          },
        },
        exclude: [
          // /[\\/]node_modules[\\/](?!(react-view)[\\/])/,
          // /node_modules\/(?![@babel\/code-frame])/,
          // /node_modules\/(?!(react-view|@babel\/code-frame|@babel\/parser|@babel\/generator|@babel\/traverse|@babel\/types|@babel\/template|@babel\/highlight|@babel\/helpers))/,
          /node_modules\/(?!(react-view|@babel\/code-frame))/,
          /packages(\/|\\)react-datepicker/,
        ],
      },
      //         exclude: /[\\/]node_modules[\\/](?!(@elastic\/eslint-config-kibana|@svgr\/plugin-jsx|@svgr\/plugin-svgo|@typescript-eslint\/eslint-plugin|@typescript-eslint\/experimental-utils|adm-zip|agent-base|aggregate-error|angular-estree-parser|ansi-align|ansi-colors|ansi-styles|append-transform|are-you-es5|ast-types-flow|astral-regex|axe-puppeteer|boxen|caller-callsite|callsites|camelcase|chalk|chromedriver|circular-dependency-plugin|clean-stack|cli-cursor|codesandbox|configstore|constants-browserify|content-type-parser|core-js-compat|cross-env|cross-spawn|crypto-random-string|css-color-names|css-declaration-sorter|cssnano|cssnano-preset-default|cssnano-util-get-arguments|cssnano-util-get-match|cssnano-util-raw-cache|cssnano-util-same-parent|dargs|dashdash|datauri|decompress-response|default-gateway|default-require-extensions|del|diff-sequences|dot-prop|editorconfig-to-prettier|enhanced-resolve|eslint|eslint-config-prettier|eslint-plugin-import|eslint-plugin-jest|eslint-plugin-prettier|eslint-plugin-react|eslint-rule-composer|eslint-scope|eslint-utils|eslint-visitor-keys|espree|execa|expect|figgy-pudding|file-entry-cache|find-cache-dir|find-up|fs-extra|fs-minipass|fullname|genfun|gensync|get-port|get-stream|getpass|gh-got|github-username|global-dirs|global-modules-path|growl|hoek|html-element-attributes|html-encoding-sniffer|http-cache-semantics|ignore|ignore-walk|import-fresh|import-lazy|import-local|infer-owner|internal-ip|interpret|ip-regex|is-color-stop|is-fullwidth-code-point|is-generator-fn|is-installed-globally|is-scoped|is-wsl|is2|isemail|isurl|items|jest|jest-changed-files|jest-config|jest-diff|jest-docblock|jest-each|jest-environment-jsdom|jest-environment-node|jest-get-type|jest-haste-map|jest-jasmine2|jest-leak-detector|jest-matcher-utils|jest-message-util|jest-mock|jest-regex-util|jest-resolve|jest-resolve-dependencies|jest-runner|jest-runtime|jest-serializer|jest-snapshot|jest-util|jest-worker|joi|jsdom|jsesc|json-parse-better-errors|kleur|latest-version|load-json-file|loader-utils|locate-path|lodash-es|log-symbols|make-dir|make-fetch-happen|map-age-cleaner|mem|mimic-fn|mimic-response|minipass|minizlib|n-readlines|ncp|node-fetch-npm|nodeclient-spectre|npm-bundled|npm-package-arg|npm-packlist|npm-pick-manifest|npm-run-path|open|ora|os-locale|p-any|p-cancelable|p-defer|p-each-series|p-finally|p-is-promise|p-limit|p-locate|p-map|p-reduce|p-some|p-timeout|p-try|parent-module|passwd-user|path-exists|path-type|pirates|pkg-dir|postcss-cli|postcss-inline-svg|postcss-normalize-display-values|postcss-normalize-positions|postcss-normalize-repeat-style|postcss-normalize-string|postcss-normalize-timing-functions|postcss-normalize-unicode|postcss-normalize-whitespace|postcss-values-parser|pre-commit|prettier|prettier-linter-helpers|pretty-bytes|pretty-format|promise-inflight|promisify-node|protoduck|puppeteer|react-docgen|react-view|read-chunk|read-pkg|read-pkg-up|realpath-native|rechoir|regexpp|remark-math|resolve-cwd|resolve-from|restore-cursor|sane|sass-lint-auto-fix|sauce-connect-launcher|schema-utils|scoped-regex|selfsigned|sisteransi|slash|slice-ansi|sort-on|ssri|start-server-and-test|string-length|string-width|strip-bom|stylehacks|symbol-tree|term-size|terser|test-exclude|tmp|to-fast-properties|topo|tr46|tsutils|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|unique-string|universalify|untildify|update-notifier|url-to-options|v8-compile-cache|vnopts|w3c-hr-time|wdio-spec-reporter|wdio-sync|webidl-conversions|whatwg-encoding|widest-line|worker-farm|write-file-atomic|ws|xdg-basedir|xml-name-validator|yargs|yargs-parser|yeoman-environment|yeoman-generator|yosay)[\\/])/,

      // {
      //   test: /\.(js|tsx?)$/,
      //   loaders: useCache(['babel-loader']), // eslint-disable-line react-hooks/rules-of-hooks
      //   exclude: [/node_modules/, /packages(\/|\\)react-datepicker/],
      // },
      {
        test: /\.scss$/,
        loaders: useCache([
          // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
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
