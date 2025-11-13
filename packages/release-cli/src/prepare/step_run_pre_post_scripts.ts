/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { runScriptOnAllWorkspaces } from '../yarn_utils';
import type { PrepareOptions } from './prepare';

/**
 * Runs the `prereleaseprepare` script in all workspaces that define it in their
 * package.json `scripts` section.
 */
export const prepareStepRunPreScripts = async (options: PrepareOptions) => {
  const { logger } = options;

  logger.info('Running "prereleaseprepare" scripts');

  await runScriptOnAllWorkspaces('prereleaseprepare');
};
