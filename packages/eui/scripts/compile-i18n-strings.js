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

const { NODE_ENV } = process.env;

const info = chalk.white;
const log = chalk.grey;

if (NODE_ENV !== 'production') return;

const command = 'yarn extract-i18n-strings';

console.log(log(command));
execSync(command, {
  stdio: 'inherit',
});
