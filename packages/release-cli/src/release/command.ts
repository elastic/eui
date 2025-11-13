/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type {
  CommandModule,
  Arguments,
  Argv,
  Options,
  InferredOptionTypes,
  PositionalOptions,
} from 'yargs';

import { createLogger } from '../logger';
import { ValidationError } from '../errors';
import { release, type ReleaseType } from './release';

const options = {
  tag: {
    type: 'string',
    describe:
      'npm tag for the release. It is forced to `latest` for official releases and defaults to `snapshot` for snapshot releases.',
  },
  workspaces: {
    type: 'string',
    array: true,
    describe:
      'An optional space-separated list of workspaces to release. Defaults to all workspaces changed since the last release.',
  },
  allowCustom: {
    type: 'boolean',
    description:
      '[UNSAFE!] Allow custom releases from unpushed changes. This should only be used with snapshot or custom releases',
    default: false,
  },
  verbose: {
    alias: 'v',
    type: 'boolean',
    description: 'Enable verbose logging',
    default: false,
  },
  dryRun: {
    type: 'boolean',
    description: 'Do not publish any packages to the npm registry',
    default: false,
  },
  skipPrompts: {
    type: 'boolean',
    description:
      'Skip user prompts and proceed with recommended settings. Use in CI only!',
    default: false,
  },
  skipUpdateVersions: {
    type: 'boolean',
    description:
      '[UNSAFE!] Skip the update version step. This should only be used for special releases like backports. The --workspaces argument is required when this argument is set.',
    default: false,
  },
  skipAuthCheck: {
    type: 'boolean',
    description:
      '[UNSAFE!] Skip the registry authentication check during init. This should only be used with npm trusted publishing configured.',
    default: false,
  },
  useAuthToken: {
    type: 'boolean',
    description:
      'Use npm auth token instead of the regular npm user authentication and one-time passwords (OTP). Use in CI only!',
    default: false,
  },
} as const satisfies Record<string, Options>;

const positional = {
  type: {
    type: 'string',
    describe:
      'Type of release to perform. Releases of type `official` will be tagged as `latest` in npm and are meant for official, stable builds only!',
    choices: ['official', 'snapshot'] satisfies ReleaseType[],
    demandOption: true,
  },
} as const satisfies Record<string, PositionalOptions>;

type CommandArgs = InferredOptionTypes<typeof options & typeof positional>;

export class ReleaseCommand implements CommandModule<{}, CommandArgs> {
  public command =
    'run <type> [--tag] [--workspaces] [--allowCustom] [--verbose | -v]';
  public describe = 'Run the release process';

  builder(args: Argv) {
    return args
      .positional('type', positional.type)
      .options(options);
  }

  async handler(argv: Arguments<CommandArgs>) {
    const {
      type,
      tag,
      workspaces,
      allowCustom,
      verbose,
      dryRun,
      skipPrompts,
      skipUpdateVersions,
      useAuthToken,
      skipAuthCheck,
    } = argv;
    const logger = createLogger(verbose);

    try {
      await release({
        type,
        tag,
        workspaces,
        logger,
        dryRun,
        skipPrompts,
        skipUpdateVersions,
        useAuthToken,
        skipAuthCheck,
        allowCustomReleases: allowCustom,
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
