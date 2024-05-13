const { execSync } = require('child_process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');
const {  } = require('loki/bin/loki');

const { argv } = yargs(hideBin(process.argv))
  .parserConfiguration({
    // @see https://github.com/yargs/yargs-parser#configuration
    'camel-case-expansion': false,
    'unknown-options-as-args': true,
    'halt-at-non-option': true,
  })
  .options({
    dev: { type: 'boolean', default: false },
  });
const isDev = argv.dev;

const error = (...args) => console.error('%s %s', chalk.red('[Error]'), chalk.reset(...args));

console.log('Running visual regression tests');

try {
  const output = execSync('docker ps -q', { encoding: 'utf-8', stdio: 'pipe' });
  console.log(output);
} catch (err) {
  if (err.status === 127) {
    error('"docker" command not found. You must have Docker installed to run visual regression tests in dev mode');
    error('Check out https://docs.docker.com/get-docker/ for installation instructions.')
    return;
  }

  error(err.stderr);

  if (err.status === 1 && err.stderr.toLowerCase().includes('is the docker daemon running?')) {
    error('Did you forget to start Docker Desktop or Docker Engine?');
    return;
  }
}

const cmd = [
  'yarn loki',
  !isDev && '--requireReference',
  ...argv._,
];

execSync(cmd.filter(Boolean).join(' '), { stdio: 'inherit' });
