/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const importRegex =
  /import([ \n\t]*(?:[^ \n\t\{\}]+[ \n\t]*,?)?(?:[ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)from[ \n\t]*(['"])(?<dependency>[^'"\n]+)(?:['"])/g;

/**
 * Find dependencies in import statements and return
 * a package.json-like dependencies object.
 */
export const findExternalDependencies = (source: string) => {
  return [...source.matchAll(importRegex)].reduce((acc, item) => {
    const dependency = item.groups?.dependency;
    if (!dependency) {
      return acc;
    }

    const splitDependency = dependency.split('/');
    if (dependency[0] === '@') {
      // org-scoped dependencies have a single slash; ignore subsequent ones
      acc[splitDependency.slice(0, 2).join('/')] = 'latest';
    } else if (splitDependency[0] && /^[a-z]/i.test(splitDependency[0])) {
      // non org-scoped dependencies should have no slashes
      acc[splitDependency[0]] = 'latest';
    }

    return acc;
  }, {} as Record<string, string>);
};
