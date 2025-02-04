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

export const getWorkspacePackageVersion = async (workspaceDir: string) => {
  const packageJsonPath = path.join(workspaceDir, 'package.json');

  let packageJson: any;
  try {
    const packageJsonContent= await fs.readFile(packageJsonPath, 'utf8');
    packageJson = JSON.parse(packageJsonContent);
  } catch (err) {
    const newErr =  new Error(`Unable to read package.json version from ${packageJsonPath}`);
    newErr.stack = (err as Error).stack;
    throw newErr;
  }

  return packageJson.version as string;
};
