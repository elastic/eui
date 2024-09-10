/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const { execSync } = require('child_process');
const chalk = require('chalk');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .parserConfiguration({
    'camel-case-expansion': false, // don't convert dash-separated options into camel case (e.g. dashSeparated)
    'unknown-options-as-args': true, // collect any extra options to pass on to cypress
  })
  .options({
    'node-options': { type: 'string', default: '' },
    dev: { type: 'boolean' },
    theme: { type: 'string', default: 'light', choices: ['light', 'dark'] },
    a11y: { type: 'boolean' },
    'react-version': {
      type: 'number',
      default: 18,
      choices: [16, 17, 18],
    },
  }).argv;

const nodeOptions = argv['node-options'];
const isDev = argv.hasOwnProperty('dev');
const isA11y = argv.hasOwnProperty('a11y');
const theme = argv.theme;
const reactVersion = argv['react-version'];

const info = chalk.white;
const log = chalk.grey;

// compile dev and a11y options for how to run tests (headless, local UI)
// and whether to run component tests or axe checks.
const testParams = isDev
  ? 'open --component'
  : `run --component --browser chrome ${
      isA11y ? '--spec="./src/**/*.a11y.tsx"' : '--spec="./src/**/*.spec.tsx"'
    }`;

const cypressCommandParts = [
  'cross-env', // windows support
  `THEME=${theme}`, // pass the theme
  'BABEL_MODULES=false', // let webpack receive ES Module code
  `NODE_OPTIONS="${nodeOptions}"`,
  'NODE_ENV=cypress_test', // enable code coverage checks
  `REACT_VERSION=${reactVersion}`, // set react version to test
  `cypress ${testParams}`,
  ...argv._, // pass any extra options given to this script
];
const cypressCommand = cypressCommandParts.join(' ');

console.log(info(`Running tests on React v${reactVersion}`));
console.log(info(`${isDev ? 'Opening' : 'Running'} cypress`));
console.log(log(cypressCommand));
execSync(cypressCommand, {
  stdio: 'inherit',
});
