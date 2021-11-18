const { execSync } = require('child_process');
const chalk = require('chalk');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
  .parserConfiguration({
    "camel-case-expansion": false, // don't convert dash-separated options into camel case (e.g. dashSeparated)
    "unknown-options-as-args": true, // collect any extra options to pass on to cypress
  })
  .options({
    'skip-css': { type: 'boolean' },
    'dev': { type: 'boolean' },
  })
  .argv

const isDev = argv.hasOwnProperty('dev');
const skipScss = argv.hasOwnProperty('skip-css');

const info = chalk.white;
const log = chalk.grey;

// compile scss -> css so tests can render correctly
if (!skipScss) {
  console.log(info('Compiling SCSS'));
  execSync(
    `TARGET_THEME=dark yarn compile-scss`,
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
  ...argv._ // pass any extra options given to this script
];
const cypressCommand = cypressCommandParts.join(' ');

console.log(info(`${isDev ? 'Opening' : 'Running'} cypress`));
console.log(log(cypressCommand))
execSync(
  cypressCommand,
  {
    stdio: 'inherit'
  }
);
