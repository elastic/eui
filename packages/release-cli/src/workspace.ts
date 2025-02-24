/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'node:path';
import fs from 'node:fs/promises';

export const getRootWorkspaceDir = () => path.resolve(__dirname, '../../..');

export const getWorkspacePackageJsonPath = (workspaceDir: string) => {
  return path.join(workspaceDir, 'package.json');
};

export const getWorkspacePackageJson = async (workspaceDir: string) => {
  const packageJsonPath = getWorkspacePackageJsonPath(workspaceDir);

  try {
    const packageJsonContent= await fs.readFile(packageJsonPath, 'utf8');
    return JSON.parse(packageJsonContent);
  } catch (err) {
    const newErr =  new Error(`Unable to read package.json from ${packageJsonPath}`);
    newErr.stack = (err as Error).stack;
    throw newErr;
  }
}

export const getWorkspacePackageVersion = async (workspaceDir: string) => {
  const packageJson = await getWorkspacePackageJson(workspaceDir);

  return packageJson.version as string;
};
