/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { promisify } from 'node:util';
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

export const execPublish = (workspace: string, tag: string, otp?: string) => {
  if (!tag) {
    throw new Error('Tag must be defined');
  }

  const otpStr = otp ? `--otp ${otp}` : '';
  return execSync(`yarn workspace ${workspace} npm publish --access public --tag ${tag} ${otpStr}`, { stdio: 'inherit', encoding: 'utf8' });
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
