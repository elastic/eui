/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactWrapper } from 'enzyme';
import { Component } from 'react';

interface TakeMountedSnapshotOptions {
  hasArrayOutput?: boolean;
}

/**
 * Use this function to generate a Jest snapshot of components that have been fully rendered
 * using Enzyme's `mount` method. Typically, a mounted component will result in a snapshot
 * containing both React components and HTML elements. This function removes the React components,
 * leaving only HTML elements in the snapshot.
 */
export const takeMountedSnapshot = (
  mountedComponent: ReactWrapper<any, {}, Component>,
  options: TakeMountedSnapshotOptions = {}
) => {
  const opts: TakeMountedSnapshotOptions = {
    hasArrayOutput: false,
    ...options,
  };
  const html = mountedComponent.html();
  const template = document.createElement('template');
  template.innerHTML = html;
  const snapshot = template.content.firstChild;
  if (opts.hasArrayOutput) {
    const snapshotArray: ChildNode[] = [];
    template.content.childNodes.forEach((el) => {
      snapshotArray.push(el);
    });
    return snapshotArray;
  }
  return snapshot;
};
