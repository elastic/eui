/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ReleaseOptions } from '../release';
import { runScriptOnAllWorkspaces } from '../yarn_utils';

/**
 * Runs the `prerelease` script in all workspaces that define it in their
 * package.json `scripts` section.
 */
export const stepRunPreScripts = async (options: ReleaseOptions) => {
  const { logger } = options;

  logger.info('Running pre release scripts');

  await runScriptOnAllWorkspaces('prerelease');
}

/**
 * Runs the `postrelease` script in all workspaces that define it in their
 * package.json `scripts` section.
 */
export const stepRunPostScripts = async (options: ReleaseOptions) => {
  const { logger } = options;

  logger.info('Running post release scripts');

  await runScriptOnAllWorkspaces('postrelease');
}
