/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import fs from 'node:fs';
import path from 'node:path';
import { getRootWorkspaceDir } from './workspace';

interface IndependentPackagesConfig {
  packages: string[];
}

const CONFIG_PATH = ['scripts', 'independent_packages.json'] as const;

let cachedPackages: string[] | undefined;

/**
 * Packages that are released independently from `@elastic/eui`: each gets its
 * own namespaced git tag (`<name>@<version>`) and GitHub Release.
 */
export const getIndependentlyReleasedPackages = (): string[] => {
  if (cachedPackages) {
    return cachedPackages;
  }

  const configPath = path.join(getRootWorkspaceDir(), ...CONFIG_PATH);

  try {
    const config: IndependentPackagesConfig = JSON.parse(
      fs.readFileSync(configPath, 'utf8')
    );
    cachedPackages = Array.isArray(config.packages) ? config.packages : [];
  } catch {
    // Fall back to treating no package as independent to avoid breaking the release.
    cachedPackages = [];
  }

  return cachedPackages;
};

/**
 * Build the release URL used in a package's collated changelog heading.
 *
 * Independently released packages link to their namespaced tag's GitHub
 * Release; every other package keeps the historic `@elastic/eui` release link.
 */
export const getChangelogReleaseUrl = (
  packageName: string,
  version: string
): string => {
  if (getIndependentlyReleasedPackages().includes(packageName)) {
    const tag = `${packageName}@${version}`;
    return `https://github.com/elastic/eui/releases/tag/${encodeURIComponent(
      tag
    )}`;
  }

  return `https://github.com/elastic/eui/releases/v${version}`;
};
