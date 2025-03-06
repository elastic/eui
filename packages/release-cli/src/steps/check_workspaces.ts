/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'node:path';
import { type ReleaseOptions } from '../release';
import { type YarnWorkspace } from '../yarn_utils';
import { getNpmPublishedVersions } from '../npm_utils';
import { getRootWorkspaceDir, getWorkspacePackageJson } from '../workspace';
import { ValidationError } from '../errors';

/**
 * Check if about to be published package versions haven't been already
 * published. This is to prevent accidental same-version publishes
 * that are very tricky to undo.
 *
 * This step doesn't establish any kind of publishing "descriptor" on workspace
 * versions that would ensure that between now and the built package's push
 * there won't be any other package pushes with conflicting version numbers.
 * This scenario is very unlikely and npm doesn't really provide tools
 * to make it safer.
 */
export const stepCheckWorkspaces = async (
  options: ReleaseOptions,
  workspacesToPublish: Array<YarnWorkspace>
) => {
  const { logger } = options;
  const rootWorkspaceDir = getRootWorkspaceDir();

  logger.info('Checking latest versions of published packages on npmjs');

  for (const workspace of workspacesToPublish) {
    const workspaceDir = path.join(rootWorkspaceDir, workspace.location);
    const packageJson = await getWorkspacePackageJson(workspaceDir);

    if (packageJson.private) {
      logger.debug(`[${workspace.name}] Package is private and will not be published`);
      continue;
    }

    const publishedVersions = await getNpmPublishedVersions(workspace.name);
    if (publishedVersions.includes(packageJson.version)) {
      throw new ValidationError(`${workspace.name}@${packageJson.version} is already available on npmjs and cannot be republished`);
    }
  }
};
