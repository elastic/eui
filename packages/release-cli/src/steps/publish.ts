/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'node:path';
import chalk from 'chalk';
import prompts from 'prompts';
import { type ReleaseOptions } from '../release';
import { getRootWorkspaceDir, getWorkspacePackageJson } from '../workspace';
import { execPublish, YarnWorkspace } from '../yarn_utils';

interface PublishedWorkspace extends YarnWorkspace {
  version: string;
}

/**
 * Publish changed packages to the registry
 */
export const stepPublish = async (
  options: ReleaseOptions,
  workspacesToPublish: Array<YarnWorkspace>
) => {
  const { logger } = options;
  const rootWorkspaceDir = getRootWorkspaceDir();

  const publishedWorkspaces: Array<PublishedWorkspace> = [];

  for (const workspace of workspacesToPublish) {
    const workspaceDir = path.join(rootWorkspaceDir, workspace.location);
    const packageJson = await getWorkspacePackageJson(workspaceDir);

    if (packageJson.private) {
      logger.debug(
        `[${workspace.name}] Package is private and will not be published`
      );
      continue;
    }

    logger.info(`[${workspace.name}] Publishing to npm`);

    let otp: string | undefined;
    if (!options.useAuthToken) {
      const result = await prompts({
        type: 'password',
        name: 'otp',
        message: `What's your npmjs one-time password (OTP)?`,
      });
      otp = result.otp;
    }

    try {
      // tag is always defined at this stage. See release.ts
      execPublish(workspace.name, options.tag!, otp);
    } catch (err) {
      logger.error(err);
      logger.error(chalk.red(`[${workspace.name}] Failed to publish package`));

      if (publishedWorkspaces.length) {
        const remainingPackages = workspacesToPublish.filter(
          (workspaceToPublish) => {
            return !!publishedWorkspaces.find(
              (publishedWorkspace) =>
                publishedWorkspace.name === workspaceToPublish.name
            );
          }
        );

        logger.error(
          chalk.red(
            `${publishedWorkspaces.length} out of ` +
              `${workspacesToPublish.length} packages were already published.`
          )
        );
        logger.error(
          `If the error was caused by a network or service issue you can ` +
            `Retry publishing these remaining packages:\n` +
            `  ${remainingPackages.join(' ')}`
        );
        logger.error(
          `Otherwise, deprecate just published versions of the following ` +
            `packages if they are strictly dependent on remaining ` +
            `packages' updates:\n` +
            `  ${publishedWorkspaces
              .map((workspace) => workspace.name)
              .join(' ')}`
        );
      } else {
        logger.error('No packages were published before this error occurred. Please try again');
      }

      return;
    }

    publishedWorkspaces.push({
      ...workspace,
      version: packageJson.version,
    });
    logger.info(
      `[${workspace.name}] Successfully published ${workspace.name}@${packageJson.version} to npmjs - https://npmjs.com/package/${workspace.name}`
    );
  }

  logger.info('Publishing packages finished 🎉');
};
