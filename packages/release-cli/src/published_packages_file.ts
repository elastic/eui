/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'node:path';
import fs from 'node:fs/promises';
import { getRootWorkspaceDir } from './workspace';

export interface PublishedPackage {
  name: string;
  version: string;
}

export type PublishedPackages = PublishedPackage[];

const RELEASE_DIR_NAME = '.release';
const PUBLISHED_PACKAGES_FILE_NAME = 'published_packages.json';

export const emitPublishedPackagesFile = async (packages: PublishedPackages) => {
  const rootDir = getRootWorkspaceDir();
  const releaseDir = path.join(rootDir, RELEASE_DIR_NAME);
  const publishedPackagesFile = path.join(
    releaseDir,
    PUBLISHED_PACKAGES_FILE_NAME
  );

  await fs.mkdir(releaseDir, { recursive: true });

  const fileContent = JSON.stringify(packages, null, 2);
  await fs.writeFile(publishedPackagesFile, fileContent, 'utf8');
};
