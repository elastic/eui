import { defineConfig } from 'cypress';
import webpackConfig from './cypress/webpack.config';

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 2,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
      });

      return config;
    },
    specPattern: ['./src/**/*.spec.tsx', './src/**/*.a11y.tsx'], // scripts/cypress.js splits this using the CLI --spec argument
    video: false,
  },
});
