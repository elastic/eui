const { execSync } = require('child_process');
const chalk = require('chalk');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const isDev = argv.hasOwnProperty('dev');
const skipScss = argv.hasOwnProperty('skipCss');

const info = chalk.white;

// compile scss -> css so tests can render correctly
if (!skipScss) {
  console.log(info('Compiling SCSS'));
  execSync(
    `TARGET_THEME=amsterdam_dark yarn compile-scss`,
    {
      stdio: 'inherit'
    }
  );
} else {
  console.log(info('Not compiling SCSS, disabled by --skip-css'));
}

const cypressCommandParts = [
  'cross-env', // windows support
  'BABEL_MODULES=false', // let webpack receive ES Module code
  'NODE_ENV=cypress_test', // enable code coverage checks
  `cypress ${isDev ? 'open-ct' : 'run-ct'}`,
];
const cypressCommand = cypressCommandParts.join(' ');

console.log(info(`${isDev ? 'Opening' : 'Running'} cypress`));
execSync(
  cypressCommand,
  {
    stdio: 'inherit'
  }
);
