const path = require('path');

const webpackConfig = {
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
};

module.exports = webpackConfig;
