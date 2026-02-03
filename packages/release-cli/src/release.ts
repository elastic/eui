/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chalk from 'chalk';

import { ValidationError } from './errors';
import type { Logger } from './logger';
import { getYarnWorkspaces, YarnWorkspace } from './yarn_utils';

import { stepInitChecks } from './steps/init_checks';
import { stepBuildPackages } from './steps/build_packages';
import { stepUpdateVersions } from './steps/update_versions';
import { stepCheckWorkspaces } from './steps/check_workspaces';
import { stepPublish } from './steps/publish';
import { stepRunPreScripts, stepRunPostScripts } from './steps/run_pre_post_scripts';

export const ReleaseType = ['official', 'snapshot'] as const;
export type ReleaseType = (typeof ReleaseType)[number];

export interface ReleaseOptions {
  type: ReleaseType;
  tag?: string;
  workspaces?: string[];
  logger: Logger;
  dryRun: boolean;
  allowCustomReleases: boolean;
  skipPrompts: boolean;
  skipUpdateVersions: boolean;
  skipAuthCheck: boolean;
  useAuthToken: boolean;
}

export const release = async (options: ReleaseOptions) => {
  const { dryRun, type, logger } = options;

  if (dryRun) {
    logger.warning('--dry-run is enabled. No packages will be published to the npm registry');
  }

  // Process tag
  if (type === 'official') {
    if (!options.tag) {
      logger.debug(
        `Release tag is not set. Defaulting to tag ${chalk.underline('latest')}`
      );
      options.tag = 'latest';
    }

    if (options.tag !== 'latest') {
      logger.warning(
        `A custom tag "${options.tag}" was provided for the official` +
        ` release type. This should be used only for special releases like` +
        ` backports. Stop here if you don't know what you're doing!`
      );
    }
  } else if (type === 'snapshot') {
    if (!options.tag) {
      logger.info(
        `Release tag is not set. Defaulting to tag ${chalk.underline(
          'snapshot'
        )}`
      );
      options.tag = 'snapshot';
    }
  } else {
    throw new ValidationError('Unknown release type. Please choose `official` or `snapshot`');
  }

  if (options.useAuthToken) {
    logger.warning('Using npmjs auth token');
  } else if (options.skipPrompts) {
    throw new ValidationError('Skipping prompts is not allowed when not using auth tokens');
  }

  if (options.skipUpdateVersions) {
    logger.warning('--skip-update-versions is set');

    if (!options.workspaces?.length) {
      throw new ValidationError('--workspaces must be set when --skip-update-version is used');
    }
  }

  if (options.skipAuthCheck) {
    logger.warning('--skip-auth-check is set');
  }

  const allWorkspaces = await getYarnWorkspaces();
  let currentWorkspaces: Array<YarnWorkspace> = [];

  if (!options.workspaces) {
    options.workspaces = [];
  }

  if (options.workspaces.length > 0) {
    for (const workspaceName of options.workspaces) {
      const workspace = allWorkspaces.find(
        (workspace) => workspace.name === workspaceName
      );

      if (!workspace) {
        throw new ValidationError(
          `Workspace \`${workspaceName}\` not found. Available workspace names: ${JSON.stringify(
            allWorkspaces
          )}`
        );
      }

      currentWorkspaces.push(workspace);
    }
  } else {
    currentWorkspaces = allWorkspaces;
  }

  await stepInitChecks(options);

  await stepBuildPackages(options);

  const changedWorkspaces = await stepUpdateVersions(options, currentWorkspaces);

  await stepRunPreScripts(options);

  const publishableWorkspaces = await stepCheckWorkspaces(options, changedWorkspaces);

  await stepPublish(options, publishableWorkspaces);

  await stepRunPostScripts(options);
};
