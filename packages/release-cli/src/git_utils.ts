/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execPromise = promisify(exec);

export const getCurrentBranch = async () => {
  const result = await execPromise('git rev-parse --abbrev-ref HEAD');

  return result.stdout;
}

export const isWorkingTreeClean = async () => {
  const gitStatusResult = await execPromise('git status --porcelain');

  return gitStatusResult.stdout === '' && gitStatusResult.stderr === '';
}

export const getRemoteHeadCommitHash = async (branchName: string) => {
  const result = await execPromise(`git ls-remote --head --exit-code upstream refs/heads/${branchName}`);

  return result.stdout.split('\t')[0];
}

export const getLocalHeadCommitHash = async () => {
  const result = await execPromise('git rev-parse HEAD');

  return result.stdout;
};

export const getCommitMessage = async (commitHash: string) => {
  // Well, technically this returns commit subject, but we don't care about the whole commit body
  const result = await execPromise(`git log -1 --pretty=format:%s ${commitHash}`);
  return result.stdout;
};
