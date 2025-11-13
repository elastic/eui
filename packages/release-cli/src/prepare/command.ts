/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { CommandModule, Arguments, Argv, Options, InferredOptionTypes } from 'yargs';

import { createLogger } from '../logger';
import { ValidationError } from '../errors';
import { prepare } from './prepare';

const options = {
  workspaces: {
    type: 'string',
    array: true,
    describe:
      'An optional space-separated list of workspaces to release. Defaults to all workspaces changed since the last release.',
  },
  skipPrompts: {
    type: 'boolean',
    description:
      'Skip user prompts and proceed with recommended settings. Use in CI only!',
    default: false,
  },
  verbose: {
    alias: 'v',
    type: 'boolean',
    description: 'Enable verbose logging',
    default: false,
  },
} as const satisfies Record<string, Options>;

type CommandArgs = InferredOptionTypes<typeof options>;

export class PrepareCommand implements CommandModule<{}, CommandArgs> {
  public command = 'prepare [--workspaces] [--verbose | -v]';
  public describe =
    'Prepare the release files and open a pull request using GitHub CLI.\n' +
    'Run this command on `main` branch only.';

  builder(args: Argv) {
    return args.options(options);
  }

  async handler(argv: Arguments<CommandArgs>) {
    const { workspaces, skipPrompts, verbose } = argv;
    const logger = createLogger(verbose);

    try {
      await prepare({
        logger,
        workspaces,
        skipPrompts,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        // ValidationErrors don't need the stacktrace printed out
        logger.error(err.toString());
      } else {
        logger.error(err);
      }
      process.exit(1);
    }
  }
}
