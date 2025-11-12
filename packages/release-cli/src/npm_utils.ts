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

export const getNpmPublishedVersions = async (packageName: string) => {
  try {
    const result = await execPromise(`npm view ${packageName} versions --json`);
    return JSON.parse(result.stdout) as string[];
  } catch (err) {
    console.error(err);
  }

  return [];
};

export interface ExecPublish {
  packageArchivePath: string;
  otp: string | undefined;
  dryRun: boolean;
  tag: string;
}

export const npmExecPublish = ({
  packageArchivePath,
  otp,
  dryRun,
  tag,
}: ExecPublish) => {
  if (!path.isAbsolute(packageArchivePath)) {
    throw new Error('packageArchivePath is not an absolute path or is empty');
  }

  if (typeof otp === 'string' && !otp.length) {
    throw new Error('OTP must be a non-empty string if defined');
  }

  if (!tag) {
    throw new Error('tag must be defined');
  }

  const otpStr = otp ? `--otp ${otp}` : '';
  const dryRunStr = dryRun ? '--dry-run' : '';
  return execSync(
    `npm publish ${packageArchivePath} --tag ${tag} --access public ${dryRunStr} ${otpStr}`,
    { stdio: 'inherit', encoding: 'utf8' }
  );
};
