/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type ReactVersion = '16' | '17' | '18';

/**
 * Get major version of React that's currently used.
 *
 */
export const getReactVersion = (): ReactVersion => {
  const reactVersion = process.env.REACT_VERSION;
  if (reactVersion !== undefined && ['16', '17', '18'].includes(reactVersion)) {
    return reactVersion as ReactVersion;
  }

  return '18';
};

/**
 * Invoke passed function when running on specified version(s) of React
 */
export const invokeOnReactVersion = (
  versionOrVersions: ReactVersion | ReactVersion[],
  func: Function
) => {
  if (!Array.isArray(versionOrVersions)) {
    versionOrVersions = [versionOrVersions];
  }

  if (versionOrVersions.includes(getReactVersion())) {
    func();
  }
};
