import { defineConfig } from 'cypress';
import fs from 'fs';
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

      on('after:spec', (spec, results) => {
        // See https://docs.cypress.io/guides/guides/screenshots-and-videos#Delete-videos-for-specs-without-failing-or-retried-tests
        if (results && results.video) {
          // Search the returned Results object for failed attempts
          // See https://docs.cypress.io/guides/guides/module-api#Results
          const failures = results.tests.some((test) => {
            test.attempts.some((attempt) => {
              attempt.state === 'failed';
            });
          });

          if (!failures) {
            // Delete the video if there are no failed attempts
            fs.unlinkSync(results.video);
          }
        }
      });

      return config;
    },
    specPattern: ['./src/**/*.spec.tsx', './src/**/*.a11y.tsx'], // scripts/cypress.js splits this using the CLI --spec argument
    video: true,
    videoCompression: 32,
    videoUploadOnPasses: false,
  },
});
