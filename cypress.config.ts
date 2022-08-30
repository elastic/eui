import { defineConfig } from 'cypress';
import webpackConfig from './cypress/plugins/webpack.config';

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
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
        }
      });
    },
    specPattern: "./src/**/*.spec.tsx",
    video: false,
  },
});
