/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { PrepareCommand } from './prepare/command';
import { ReleaseCommand } from './release/command';

export const cli = () => {
  yargs(hideBin(process.argv))
    .command(new PrepareCommand())
    .command(new ReleaseCommand())
    .demandCommand(1)
    .parse();
};
