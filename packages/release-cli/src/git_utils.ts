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

  return result.stdout.trim();
}

export const isWorkingTreeClean = async () => {
  const gitStatusResult = await execPromise('git status --porcelain');

  return gitStatusResult.stdout === '' && gitStatusResult.stderr === '';
}

export const getRemoteHeadCommitHash = async (branchName: string) => {
  try {
    const result = await execPromise(`git ls-remote --head --exit-code upstream refs/heads/${branchName}`);
    return result.stdout.split('\t')[0];
  } catch (err) {
    // https://git-scm.com/docs/git-ls-remote#Documentation/git-ls-remote.txt---exit-code
    if ((err as any).code === 2) {
      // Remote ref not found
      return '';
    }

    throw err;
  }
}

export const getLocalHeadCommitHash = async () => {
  const result = await execPromise('git rev-parse HEAD');

  return result.stdout.trim();
};

export const getCommitMessage = async (commitHash: string) => {
  // Well, technically this returns commit subject, but we don't care about the whole commit body
  const result = await execPromise(`git log -1 --pretty=format:%s ${commitHash}`);
  return result.stdout.trim();
};

export const stageFiles = async (files: string[]) => {
  return execPromise(`git add ${files.join(' ')}`);
};

export const commitFiles = async (message: string, files: string[]) => {
  // This isn't the best at handling unusual formatting like messages with quotes
  return execPromise(`git commit ${files.join(' ')} -m "${message}"`);
}

export const isFileAddedToGit = async (file: string) => {
  const result = await execPromise(`git ls-files --exclude-standard "${file}"`);
  return result.stdout.length > 0;
}
