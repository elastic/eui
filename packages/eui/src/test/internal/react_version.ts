/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type ReactVersion = '17' | '18';

export const SUPPORTED_REACT_VERSIONS: ReactVersion[] = ['17', '18'];

/**
 * Get major version of React that's currently used.
 *
 */
export const getReactVersion = (): ReactVersion => {
  const reactVersion = process.env.REACT_VERSION;
  if (
    reactVersion !== undefined &&
    SUPPORTED_REACT_VERSIONS.includes(reactVersion as ReactVersion)
  ) {
    return reactVersion as ReactVersion;
  }

  return '18';
};

export const isReactVersion = (
  versionOrVersions: ReactVersion | ReactVersion[]
): boolean => {
  if (!Array.isArray(versionOrVersions)) {
    versionOrVersions = [versionOrVersions];
  }

  return versionOrVersions.includes(getReactVersion());
};

/**
 * Invoke passed function when running on specified version(s) of React
 */
export const invokeOnReactVersion = (
  versionOrVersions: ReactVersion | ReactVersion[],
  func: Function
) => {
  if (isReactVersion(versionOrVersions)) {
    func();
  }
};

/**
 * Jest describe wrapper calling describe() for every supported React version
 * and prefixing the name with version numbers. Only the currently running
 * version isn't skipped.
 *
 * It's primary use is to separate snapshots by React version in case there are
 * differences with, for example, unique ID generation.
 */
export const describeByReactVersion = (name: string, func: () => void) => {
  const currentVersion = getReactVersion();

  SUPPORTED_REACT_VERSIONS.forEach((version) => {
    const describeFunc = version === currentVersion ? describe : describe.skip;

    describeFunc(`[React ${version}] ${name}`, func);
  });
};

/**
 * Jest test wrapper calling test() for every supported React version
 * and prefixing the name with version numbers. Only the currently running
 * version isn't skipped.
 *
 * It's primary use is to separate snapshots by React version in case there
 * are differences with, for example, unique ID generation.
 */
export const testByReactVersion = (name: string, func: () => void) => {
  const currentVersion = getReactVersion();

  SUPPORTED_REACT_VERSIONS.forEach((version) => {
    const testFunc = version === currentVersion ? test : test.skip;

    testFunc(`[React ${version}] ${name}`, func);
  });
};

export const testOnReactVersion = (
  versionOrVersions: ReactVersion | ReactVersion[]
): typeof test => {
  return isReactVersion(versionOrVersions) ? test : test.skip;
};
