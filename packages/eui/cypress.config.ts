import { defineConfig } from 'cypress';
import { unlinkSync } from 'fs';
import webpackConfig from './cypress/webpack.config';

/**
 * Buildkite reporter requires a token to be set and this token is only
 * available when cypress is running in our CI pipeline.
 */
const isBuildkiteReporterAvailable =
  typeof process.env.BUILDKITE_ANALYTICS_TOKEN === 'string' &&
  process.env.BUILDKITE_ANALYTICS_TOKEN !== '';

if (isBuildkiteReporterAvailable) {
  console.log('Buildkite Test Analytics reporter available');
}

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

      on(
        'after:spec',
        (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
          if (config.video) {
            if (results.stats.failures !== 0) {
              console.log(
                `[FAILURE]: Recording video for ${results.spec.name}.`
              );
            } else {
              unlinkSync(results.video!);
            }
          }
        }
      );

      return config;
    },
    specPattern: ['./src/**/*.spec.tsx', './src/**/*.a11y.tsx'], // scripts/cypress.js splits this using the CLI --spec argument
    video: false,
    videoCompression: 32, // more time to process, but a smaller file to upload as an artifact
  },

  reporter: isBuildkiteReporterAvailable
    ? 'buildkite-test-collector/cypress/reporter'
    : undefined,
  reporterOptions: {
    token_name: 'BUILDKITE_ANALYTICS_TOKEN',
  },
});
