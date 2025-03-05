/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ChangelogMap } from './update_changelog';

export const VersionType = {
  major: 'major',
  minor: 'minor',
  patch: 'patch',
  backport: 'backport',
  prerelease: 'prerelease',
} as const;

export type VersionType = typeof VersionType[keyof typeof VersionType];

export const getUpcomingVersion = (currentVersion: string, target: string): string => {
  let [major, minor, patch] = currentVersion.split('.').map(Number);

  const incrementPreId = (preId: string): string => {
    const [versionWithoutPreId, affix] = currentVersion.split(`-${preId}`);
    // Releasing from a main release, e.g. `v1.1.1` - add the preId and number automatically
    if (!affix) return `${currentVersion}-${preId}.0`;

    const releaseNumber = Number(affix.split('.')[1]);
    // Edge case for odd formats - coerce to the format we want
    if (isNaN(releaseNumber)) return `${versionWithoutPreId}-${preId}.0`;

    // Otherwise, increment the existing release number
    return `${versionWithoutPreId}-${preId}.${releaseNumber + 1}`;
  };

  switch (target) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
    case 'backport':
      return incrementPreId('backport');
    case 'prerelease':
      return incrementPreId('rc');
  }

  return [major, minor, patch].join('.');
};

export const getUpcomingSnapshotVersion = (currentVersion: string, uniqueId: string): string => {
  // remove preid part of the version string if exists
  const [version, _] = currentVersion.split('-');
  return `${version}-snapshot.${uniqueId}`;
};

export const getUniqueSnapshotId = () => {
  return Date.now().toString();
}

export const getVersionTypeFromChangelog = (changelogMap: ChangelogMap): VersionType => {
  const hasFeatures = changelogMap['Features'].length > 0;
  const hasBugFixes = changelogMap['Bug fixes'].length > 0;
  const hasBreakingChanges = changelogMap['Breaking changes'].length > 0;

  if (hasBugFixes && !hasFeatures) {
    // there are bug fixes with no minor features
    return VersionType.patch;
  }

  if (hasBreakingChanges) {
    // detected breaking changes
    return VersionType.major;
  }

  // default to a MINOR bump (new features, may have bug fixes, no breaking changes)
  return VersionType.minor;
}
