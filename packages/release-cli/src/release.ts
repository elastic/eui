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
  allowCustomReleases: boolean;
  skipPrompts: boolean;
  useAuthToken: boolean;
}

export const release = async (options: ReleaseOptions) => {
  const { type, logger } = options;

  // Process tag
  if (type === 'official') {
    if (!options.tag) {
      logger.debug(
        `Release tag is not set. Defaulting to tag ${chalk.underline('latest')}`
      );
      options.tag = 'latest';
    }

    if (options.tag !== 'latest') {
      throw new ValidationError(
        'Custom tags are not allowed for type `official`! Please use another type to perform custom releases'
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

  await stepCheckWorkspaces(options, changedWorkspaces);

  await stepPublish(options, changedWorkspaces);

  await stepRunPostScripts(options);
};
