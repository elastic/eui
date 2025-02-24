/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { execSync } from 'node:child_process';

import { type ReleaseOptions } from '../release';

/**
 * Install dependencies and run the `build` script in all workspaces
 */
export const stepBuildPackages = async (options: ReleaseOptions) => {
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
