const { execSync } = require('child_process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');

const { argv } = yargs(hideBin(process.argv))
  .parserConfiguration({
    // @see https://github.com/yargs/yargs-parser#configuration
    'camel-case-expansion': false,
    'unknown-options-as-args': true,
    'halt-at-non-option': true,
  })
  .options({
    'react-version': {
      type: 'number',
      default: 18,
      choices: [16, 17, 18],
    },
  });
const reactVersion = argv['react-version'];

const commandParts = [
  'cross-env', // windows support
  'NODE_ENV=test',
  `REACT_VERSION=${reactVersion}`,
  `jest --config ./scripts/jest/config.js`,
  ...argv._, // pass any extra options given to this script
];
const command = commandParts.join(' ');

console.log(chalk.white(command));
try {
  execSync(command, { stdio: 'inherit' });
} catch {
  // Jest already outputs sufficient error messaging, no need to emit a
  // node child process stack trace that just unhelpfully points to this file
  process.exit(1);
}
