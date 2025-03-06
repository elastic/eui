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

export const getNpmPublishedVersions = async (packageName: string) => {
  try {
    const result = await execPromise(`npm view ${packageName} versions --json`);
    return JSON.parse(result.stdout) as string[];
  } catch (err) {
    console.error(err);
  }

  return [];
}
