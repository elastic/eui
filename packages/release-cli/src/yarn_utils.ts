/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { promisify } from 'node:util';
import path from 'node:path';
import { exec, execSync } from 'node:child_process';

const execPromise = promisify(exec);

export interface YarnWorkspace {
  location: string;
  name: string;
}

export const getYarnWorkspaces = async (includeRoot: boolean = false) => {
  const result = await execPromise('yarn workspaces list --json');
  const workspaces = JSON.parse(
    `[${result.stdout.replace(/\n/g, ',').slice(0, -1)}]`
  ) as Array<YarnWorkspace>;

  if (includeRoot) {
    return workspaces;
  }

  return workspaces.filter((workspace) => workspace.location !== '.');
};

export const runScriptOnAllWorkspaces = async (script: string) => {
  return execPromise(`yarn workspaces foreach --all run ${script}`);
};

export const updateWorkspaceVersion = async (workspace: string, version: string) => {
  return execPromise(`yarn workspace ${workspace} version ${version}`);
};

export interface YarnPackRawDetail {
  base?: string;
  location?: string;
  output?: string;
}

export interface YarnPackDetails {
  /**
   * An absolute base path to the workspace root directory
   */
  base: string;
  /**
   * An array of absolute paths to files packed in the tgz archive
   */
  files: string[];
  /**
   * An absolute path to the output tgz archive
   */
  output: string;
}

export const yarnPack = async (workspace: string)=> {
  const result = await execPromise(`yarn workspace ${workspace} pack --json`);
  const rawDetails = JSON.parse(
    `[${result.stdout.replace(/\n/g, ',').slice(0, -1)}]`
  ) as Array<YarnPackRawDetail>;
  const details: YarnPackDetails = {
    base: '',
    files: [],
    output: '',
  };
  for (const rawDetail of rawDetails) {
    if (rawDetail.base) {
      details.base = rawDetail.base;
    }
    if (rawDetail.location) {
      details.files.push(rawDetail.location);
    }
    if (rawDetail.output) {
      details.output = rawDetail.output;
    }
  }

  // Validate the returned data
  if (!details.base) {
    throw new Error(
      'yarn pack did not return the base path for the workspace. ' +
        'This likely means that the command\'s JSON output changed format. ' +
        'Please check the current yarn pack API and update the code '
    );
  }

  if (!details.output) {
    throw new Error(
      'yarn pack did not return the path for the output tgz archive. ' +
        'This likely means that the command\'s JSON output changed format. ' +
        'Please check the current yarn pack API and update the code '
    );
  }

  // By default, the returned location property is a path relative
  // to the workspace root directory. We want absolute paths instead.
  details.files = details.files.map((file) => path.join(details.base, file));
  return details;
};

export const getAuthenticatedUser = async () => {
  try {
    const result = await execPromise('yarn npm whoami');
    // npmjs usernames can only contain alphanumeric characters and hypens
    const [_, username] = result.stdout.split('\n')[0].split(': ');

    // yarn npm whoami can return `undefined` in certain cases
    if (!username || username === 'undefined') {
      return null;
    }

    return username;
  } catch (err) {
    return null;
  }
};

export const getYarnRegistryServer = async () => {
  // Yarn supports scoped and non-scoped/global settings.
  // We must check both to ensure we get the correct value

  const getOutput = async (cmd: string) => {
    const result = await execPromise(cmd);
    const rawOutput = result.stdout.trim();
    if (rawOutput === 'undefined') {
      return null;
    }

    const output = JSON.parse(rawOutput);
    if (!output || output === '') {
      return null;
    }

    return output;
  }

  const scopedOutput = await getOutput(`yarn config get 'npmScopes["elastic"].npmRegistryServer' --json`);
  if (scopedOutput !== null) {
    return scopedOutput;
  }

  // return await to keep the rejection behavior the same
  // for both getOutput calls
  return await getOutput('yarn config get npmRegistryServer --json');
};
