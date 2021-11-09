const { execSync } = require('child_process');
const chalk = require('chalk');

const isDev = process.env.NODE_ENV === 'development';
const skipScss = process.env.SKIP_CSS === 'true';

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
  console.log(info('Not compiling SCSS, disabled by SKIP_CSS=true'));
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
