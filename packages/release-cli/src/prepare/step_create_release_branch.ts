/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { PrepareOptions } from './prepare';
import { createBranch } from '../git_utils';

export const prepareStepCreateReleaseBranch = async (
  options: PrepareOptions
) => {
  const { logger } = options;

  const releaseBranchName = `release-${Date.now().toString()}`;

  logger.info('Creating a release branch');

  await createBranch(releaseBranchName);

  logger.info(`Release branch "${releaseBranchName}" created`);
};
