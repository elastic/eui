/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import chalk from 'chalk';

import { ValidationError } from './errors';
import type { Logger } from './logger';
import {
  getCommitMessage,
  getCurrentBranch,
  getLocalHeadCommitHash,
  getRemoteHeadCommitHash,
  isWorkingTreeClean,
} from './git_utils';
import { getYarnWorkspaces, YarnWorkspace } from './yarn_utils';
import { getRootWorkspaceDir, getWorkspacePackageVersion } from './workspace';
import { collateChangelogFiles, updateChangelogContent } from './update_changelog';
import { getUpcomingVersion, getVersionTypeFromChangelog } from './version';

export const ReleaseType = ['official', 'snapshot'] as const;
export type ReleaseType = (typeof ReleaseType)[number];

export interface ReleaseOptions {
  type: ReleaseType;
  tag?: string;
  workspaces?: string[];
  logger: Logger;
  allowCustomReleases: boolean;
}

const stepInitChecks = async (options: ReleaseOptions) => {
  const { type, logger, allowCustomReleases } = options;

  logger.info('Running initial checks');

  // Check if releasing from main branch
  const currentBranch = await getCurrentBranch();
  if (currentBranch !== 'main' && type === 'official') {
    throw new ValidationError(
      'Official releases are only allowed from the `main` branch!'
    );
  }

  if (!(await isWorkingTreeClean())) {
    throw new ValidationError(
      'Git working tree is dirty. Please clean up your working tree from any uncommited changes and try again.',
      `To clean local changes and restore the branch to remote state, please run:` +
        `\n  ${chalk.yellowBright(
          `git reset --hard upstream/${currentBranch}`
        )}` +
        `Please note that ${chalk.underline.bold(
          'this will discard all local changes'
        )}!`
    );
  }

  const remoteHash = await getRemoteHeadCommitHash('main');
  const localHash = await getLocalHeadCommitHash();
  logger.debug(`Remote HEAD = ${remoteHash}`);
  logger.debug(`Local HEAD = ${localHash}`);

  if (localHash !== remoteHash) {
    if (type === 'official') {
      throw new ValidationError(
        'Local `main` branch is out of sync with the upstream branch. Please pull the latest changes and try again.'
      );
    }

    if (!allowCustomReleases) {
      throw new ValidationError(
        'Local HEAD does not match the remote HEAD. Use --allow-custom to create a custom non-official release ' +
          'if that really is what you were planning to do.'
      );
    }
  }

  const commitMessage = await getCommitMessage(localHash);
  logger.info(
    `Proceeding to release packages from commit ${localHash} (${commitMessage}) on branch ${currentBranch}...`
  );
};

const stepBuildPackages = async (options: ReleaseOptions) => {
  const { logger } = options;

  logger.info('Installing dependencies and building packages');

  // Install dependencies in case something's missing
  execSync('yarn', { stdio: 'inherit' });

  // Build all packages in topological order from the monorepo root
  // while ignoring the monorepo root package.json
  execSync(
    'yarn workspaces foreach --topological --worktree --from @elastic/eui-monorepo --exclude @elastic/eui-monorepo run build',
    {
      stdio: 'inherit',
    }
  );
};

const stepUpdateVersions = async (
  options: ReleaseOptions,
  workspaces: Array<YarnWorkspace>
) => {
  const { logger } = options;

  logger.info('Updating package versions and changelogs');

  const rootWorkspaceDir = getRootWorkspaceDir();

  for (const workspace of workspaces) {
    logger.debug(`Calculating changes in ${workspace.name}`);

    const workspaceDir = path.join(rootWorkspaceDir, workspace.location);
    const currentVersion = await getWorkspacePackageVersion(workspaceDir);

    const {
      changelogMap,
      changelog,
      hasChanges,
    } = await collateChangelogFiles(workspaceDir);

    if (!hasChanges) {
      logger.debug(`[${workspace.name}] No changes detected`)
      continue;
    }

    const versionType = getVersionTypeFromChangelog(changelogMap);
    const newVersion = getUpcomingVersion(currentVersion, versionType);

    logger.info(`[${workspace.name}] Updating version ${currentVersion} -> ${newVersion} (${versionType})`);
    await updateChangelogContent(workspaceDir, changelog, newVersion);
  }
};

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
  } else {
    if (!options.tag) {
      logger.info(
        `Release tag is not set. Defaulting to tag ${chalk.underline(
          'snapshot'
        )}`
      );
      options.tag = 'snapshot';
    }
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
        throw new ValidationError(`Workspace \`${workspaceName}\` not found. Available workspace names: ${JSON.stringify(allWorkspaces)}`);
      }

      currentWorkspaces.push(workspace);
    }
  } else {
    currentWorkspaces = allWorkspaces;
  }

  await stepInitChecks(options);

  // Build all packages to ensure local dependencies are up to date
  await stepBuildPackages(options);

  await stepUpdateVersions(options, currentWorkspaces);
};
