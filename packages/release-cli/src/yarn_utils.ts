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

export interface YarnWorkspace {
  location: string;
  name: string;
}

export const getYarnWorkspaces = async (includeRoot: boolean = false) => {
  const result = await execPromise('yarn workspaces list --json');
  const workspaces = JSON.parse(`[${result.stdout.replace(/\n/g, ',').slice(0, -1)}]`) as Array<YarnWorkspace>;

  if (includeRoot) {
    return workspaces;
  }

  return workspaces.filter((workspace) => workspace.location !== '.');
};
