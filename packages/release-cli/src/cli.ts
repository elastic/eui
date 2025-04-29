/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { release, type ReleaseType } from './release';
import { Logger } from './logger';
import { ValidationError } from './errors';

export const cli = () => {
  yargs(hideBin(process.argv))
    .command(
      'run <type> [--tag] [--workspaces] [--allowCustom] [--verbose | -v]',
      'Run the release process',
      (yargs) => {
        return yargs
          .positional('type', {
            type: 'string',
            describe:
              'Type of release to perform. Releases of type `official` will be tagged as `latest` in npm and are meant for official, stable builds only!',
            choices: ['official', 'snapshot'] satisfies ReleaseType[],
            demandOption: true,
          })
          .option('tag', {
            type: 'string',
            describe:
              'npm tag for the release. It is forced to `latest` for official releases and defaults to `snapshot` for snapshot releases.',
          })
          .option('workspaces', {
            type: 'string',
            array: true,
            describe:
              'An optional space-separated list of workspaces to release. Defaults to all workspaces changed since the last release.',
          })
          .option('allowCustom', {
            type: 'boolean',
            description: '[UNSAFE!] Allow custom releases from unpushed changes. This should only be used with snapshot or custom releases',
            default: false,
          })
          .option('verbose', {
            alias: 'v',
            type: 'boolean',
            description: 'Enable verbose logging',
            default: false,
          })
          .option('skipPrompts', {
            type: 'boolean',
            description:
              'Skip user prompts and proceed with recommended settings. Use in CI only!',
            default: false,
          })
          .option('skipUpdateVersions', {
            type: 'boolean',
            description: '[UNSAFE!] Skip the update version step. This should only be used for special releases like backports. The --workspaces argument is required when this argument is set.',
            default: false,
          })
          .option('useAuthToken', {
            type: 'boolean',
            description:
              'Use npm auth token instead of the regular npm user authentication and one-time passwords (OTP). Use in CI only!',
            default: false,
          });
      },
      async (argv) => {
        const {
          type,
          tag,
          workspaces,
          allowCustom,
          verbose,
          skipPrompts,
          skipUpdateVersions,
          useAuthToken,
        } = argv;
        const logger = new Logger(verbose);

        try {
          await release({
            type,
            tag,
            workspaces,
            logger,
            skipPrompts,
            skipUpdateVersions,
            useAuthToken,
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
    )
    .demandCommand(1)
    .parse();
};
