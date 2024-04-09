import { defineConfig } from 'cypress';
import { unlinkSync } from 'fs';
import webpackConfig from './cypress/webpack.config';

const enableCodeCoverage = process.env.CYPRESS_CODE_COVERAGE !== 'false';

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 2,
  },

  experimentalMemoryManagement: true,

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    setupNodeEvents(on, config) {
      if (enableCodeCoverage) {
        require('@cypress/code-coverage/task')(on, config);
        on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
      }

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
});
