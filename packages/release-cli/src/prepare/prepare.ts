/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Logger } from '../logger';
import { processWorkspacesArgument } from '../utils/workspaces';
import { prepareStepInitChecks } from './step_init_checks';
import { prepareStepUpdateVersions } from './step_update_versions';
import { prepareStepRunPreScripts } from './step_run_pre_post_scripts';

export interface PrepareOptions {
  logger: Logger;
  workspaces?: string[];
  skipPrompts: boolean;
}

export const prepare = async (options: PrepareOptions) => {
  const { logger } = options;

  const workspaces = await processWorkspacesArgument(options.workspaces);

  await prepareStepInitChecks(options);

  await prepareStepUpdateVersions(options, workspaces);

  await prepareStepRunPreScripts(options);
};
