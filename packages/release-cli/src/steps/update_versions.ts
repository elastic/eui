/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'node:path';
import { type ReleaseOptions } from '../release';
import { type YarnWorkspace, updateWorkspaceVersion } from '../yarn_utils';
import {
  getRootWorkspaceDir,
  getWorkspacePackageJsonPath,
  getWorkspacePackageVersion,
} from '../workspace';
import {
  collateChangelogFiles,
  deleteObsoleteChangelogs,
  updateChangelogContent,
} from '../update_changelog';
import {
  getUniqueSnapshotId,
  getUpcomingSnapshotVersion,
  getUpcomingVersion,
  getVersionTypeFromChangelog,
} from '../version';
import { commitFiles, isFileAddedToGit, stageFiles } from '../git_utils';

/**
 * Update version numbers and yearly changelogs based on workspace
 * changelog files.
 */
export const stepUpdateVersions = async (
  options: ReleaseOptions,
  workspaces: Array<YarnWorkspace>
) => {
  const { logger } = options;

  logger.info('Updating package versions and changelogs');

  const filesToCommit: string[] = [];
  const changedWorkspaces: YarnWorkspace[] = [];
  const rootWorkspaceDir = getRootWorkspaceDir();
  const snapshotId = getUniqueSnapshotId();

  for (const workspace of workspaces) {
    logger.debug(`Calculating changes in ${workspace.name}`);

    const workspaceDir = path.join(rootWorkspaceDir, workspace.location);
    const currentVersion = await getWorkspacePackageVersion(workspaceDir);

    if (options.type === 'snapshot') {
      const newVersion = getUpcomingSnapshotVersion(currentVersion, snapshotId);
      await updateWorkspaceVersion(workspace.name, newVersion);

      logger.info(`[${workspace.name}] Updating version ${currentVersion} -> ${newVersion}`);
    } else {
      const { changelogMap, changelog, hasChanges, processedChangelogFiles } =
        await collateChangelogFiles(workspaceDir);

      if (!hasChanges) {
        logger.debug(`[${workspace.name}] No changes detected`);
        continue;
      }

      const versionType = getVersionTypeFromChangelog(changelogMap);
      const newVersion = getUpcomingVersion(currentVersion, versionType);

      const statsStr = Object.entries(changelogMap)
        .filter(([_, items]) => items.length)
        .map(([name, items]) => `${items.length} ${name.toLowerCase()}`);

      logger.info(
        `[${workspace.name}] Updating version ${currentVersion} -> ${newVersion} (${versionType} update; ${statsStr})`
      );

      const updatedYearChangelogPath = await updateChangelogContent(
        workspaceDir,
        changelog,
        newVersion
      );
      await deleteObsoleteChangelogs(processedChangelogFiles);

      // Update package.json version string
      await updateWorkspaceVersion(workspace.name, newVersion);

      filesToCommit.push(getWorkspacePackageJsonPath(workspaceDir));
      filesToCommit.push(updatedYearChangelogPath);

      // Only stage and commit changelog files that are added to git (versioned)
      for (const file of processedChangelogFiles) {
        if (await isFileAddedToGit(file)) {
          filesToCommit.push(file);
        }
      }
    }

    changedWorkspaces.push(workspace);
  }

  if (!changedWorkspaces.length) {
    throw new Error('There are no changes to release');
  }

  if (options.type !== 'snapshot') {
    // Stage yarn.lock changes
    const yarnLockPath = path.join(rootWorkspaceDir, 'yarn.lock');
    filesToCommit.push(yarnLockPath);
    await stageFiles([yarnLockPath]);

    // Stage updated package.json files
    await stageFiles(filesToCommit);

    // Commit all package.json files and yarn.lock
    await commitFiles('chore: update package versions [skip ci]', filesToCommit);
  }

  return changedWorkspaces;
};
