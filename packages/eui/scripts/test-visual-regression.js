const { execSync } = require('child_process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv))
  .parserConfiguration({
    // @see https://github.com/yargs/yargs-parser#configuration
    'camel-case-expansion': false,
    'unknown-options-as-args': true,
    'halt-at-non-option': true,
  });

const isUpdate = argv._.includes('update');
const extraArgs = argv._.filter((arg) => arg !== 'update');

// Safe-guard to ensure the browser is installed before running the tests
execSync('yarn playwright install chromium', { stdio: 'inherit' });

console.log('Running visual regression tests');

const cmd = [
  'yarn test-storybook',
  isUpdate && '--updateSnapshot',
  ...extraArgs,
];

execSync(cmd.filter(Boolean).join(' '), { stdio: 'inherit' });
