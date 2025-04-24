/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chalk from 'chalk';
import prompts from 'prompts';

import { ValidationError } from '../errors';
import { type ReleaseOptions } from '../release';
import {
  getCommitMessage,
  getCurrentBranch,
  getLocalHeadCommitHash,
  getRemoteHeadCommitHash,
  isWorkingTreeClean,
} from '../git_utils';
import { getAuthenticatedUser, getYarnRegistryServer } from '../yarn_utils';

/**
 * Check current git branch, working tree status and more to ensure
 * no unreviewed data is (accidentally) published.
 */
export const stepInitChecks = async (options: ReleaseOptions) => {
  const { type, logger, allowCustomReleases } = options;

  logger.info('Running initial checks');

  // Check if releasing from main branch
  const currentBranch = await getCurrentBranch();
  if (currentBranch !== 'main' && type === 'official' && !allowCustomReleases) {
    throw new ValidationError(
      'Official releases are only allowed from the `main` branch!'
    );
  }

  if (!(await isWorkingTreeClean())) {
    throw new ValidationError(
      'Git working tree is dirty. Please clean up your working tree' +
      ' from any uncommited changes and try again.',
      `To clean local changes and restore the branch to remote state,` +
        ` please run:\n  ${chalk.yellowBright(
          `git reset --hard upstream/${currentBranch}`
        )}\n` +
        `Please note that ${chalk.underline.bold(
          'this will discard all local changes'
        )}!`
    );
  }

  const remoteHash = await getRemoteHeadCommitHash(currentBranch);
  const localHash = await getLocalHeadCommitHash();
  logger.debug(`Remote HEAD = ${remoteHash}`);
  logger.debug(`Local HEAD = ${localHash}`);

  if (localHash !== remoteHash) {
    if (!allowCustomReleases) {
      throw new ValidationError(
        'Local HEAD does not match the remote HEAD. Use --allow-custom to' +
          ' create a custom non-official release if that really is what' +
          'you were planning to do.'
      );
    } else {
      logger.warning('Local HEAD does not match the remote HEAD');
    }
  }

  const commitMessage = await getCommitMessage(localHash);
  logger.info(
    `Current commit: ${localHash} (${chalk.underline.bold(
      commitMessage
    )}) on branch ${chalk.underline.bold(currentBranch)}`
  );

  const registryUser = await getAuthenticatedUser();
  if (!registryUser) {
    throw new ValidationError(
      'Authentication to npmjs is required. Please log in before running' +
      ' this command again.',
      `To authenticate run the following command:\n` +
        `  ${chalk.yellowBright('yarn npm login')}`
    );
  }

  logger.info(`Logged in to npmjs as ${registryUser}`);

  const npmRegistry = await getYarnRegistryServer();
  if (npmRegistry) {
    logger.warning(
      chalk.yellow(
        `A custom npm registry server (${npmRegistry}) will be used!`
      )
    );
  } else {
    logger.info('The official npm registry server will be used');
  }

  if (!options.skipPrompts) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message:
        'This script will build, version and publish changed ' +
        'packages in EUI monorepo. The operation should take 5-10 minutes ' +
        'and will require your personal OTP token for npmjs.\n' +
        'Do you want to proceed?',
    });

    if (!proceed) {
      console.error(chalk.red(`Release cancelled`));
      process.exit(1);
    }
  }
};
