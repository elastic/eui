const { execSync } = require('child_process');

// Combines Jest code coverage and Cypress code coverage into a single report %
// NOTE: `yarn test-cypress` and `yarn test-unit --coverage` must have already been run
// in order for the correct coverage JSON files to exist and be combined

// Clean folder and re-import Jest/Cypress JSON coverage reports
execSync('rm -rf reports/combined-coverage && mkdir reports/combined-coverage');
execSync(
  'cp reports/jest-coverage/coverage-final.json reports/combined-coverage/jest-coverage.json'
);
execSync(
  'cp reports/cypress-coverage/coverage-final.json reports/combined-coverage/cypress-coverage.json'
);

// Tell Istanbul to merge the reports in the folder and generate a HTML report
execSync(
  'yarn nyc merge reports/combined-coverage reports/combined-coverage/coverage-final.json'
);
execSync(
  'yarn nyc report --reporter html --temp-dir reports/combined-coverage --report-dir reports/combined-coverage'
);

// Open the HTML report for convenience
execSync('open reports/combined-coverage/index.html');
