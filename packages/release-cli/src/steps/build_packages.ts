/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { execSync } from 'node:child_process';

import { type ReleaseOptions } from '../release';

// A list of very specific packages to exclude when building
// Should probably become a configuration option at some point
const workspacesToExclude = [
  // exclude itself to prevent any unexpected behavior
  '@elastic/eui-release-cli',
  // the monorepo is just a "wrapper" workspace and doesn't need building
  `@elastic/eui-monorepo`,
  // only needed by @elastic/eui-website
  '@elastic/eui-docgen',
  // private and fully independent
  '@elastic/eui-website',
];

/**
 * Install dependencies and run the `build` script in all workspaces
 */
export const stepBuildPackages = async (options: ReleaseOptions) => {
  const { logger } = options;

  logger.info('Installing dependencies and building packages');

  // Install dependencies in case something's missing
  execSync('yarn', { stdio: 'inherit' });

  const cmd = [
    'yarn workspaces foreach',

    // consider both "dependencies" and "devDependencies" package.json fields
    // in topological order
    '--topological-dev',

    // include all local workspaces
    '--all',

    // exclude selected independent and fully private workspaces
    workspacesToExclude.map((name) => `--exclude ${name}`).join(' '),

    'run build',
  ].join(' ');
  execSync(cmd, {
    stdio: 'inherit',
  });
};
