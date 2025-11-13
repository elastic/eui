/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { PrepareOptions } from './prepare';
import { ValidationError } from '../errors';
import {
  getCommitMessage,
  getCurrentBranch,
  getLocalHeadCommitHash,
  getRemoteHeadCommitHash,
  isWorkingTreeClean,
} from '../git_utils';
import chalk from 'chalk';
import prompts from 'prompts';

export const prepareStepInitChecks = async (options: PrepareOptions) => {
  const { logger, skipPrompts } = options;

  logger.info('Running initial checks');

  // Check if releasing from main branch
  const currentBranch = await getCurrentBranch();
  if (currentBranch !== 'main') {
    throw new ValidationError(
      'Releases are only allowed from the `main` branch!'
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
    throw new ValidationError(
      'Local HEAD does not match the remote HEAD. Please fetch the latest changes from upstream'
    );
  }

  const commitMessage = await getCommitMessage(localHash);
  logger.info(
    `Current commit: ${localHash} (${chalk.underline.bold(
      commitMessage
    )}) on branch ${chalk.underline.bold(currentBranch)}`
  );

  if (!skipPrompts) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message:
        'This script will: \n' +
        `1. Create a local release branch based on ${currentBranch}\n` +
        '2. Build and version packages\n' +
        '3. Commit all changes\n' +
        'Do you want to proceed?',
    });

    if (!proceed) {
      console.error(chalk.red(`Release cancelled`));
      process.exit(1);
    }
  }
};
