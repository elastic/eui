/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  getEuiComponentFromClassName,
  removeSerializedSyntax,
  fixIndentation,
  printEmptyComponent,
  printWrappingComponent,
} from '../utils';
import { COMPONENTS_HTML, COMPONENTS_TEXT } from '../components';

/**
 * Utils
 */
const isCheerioWrapper = (wrapper: any) => wrapper?.cheerio != null;

/**
 * Snapshot serializer
 */
export const euiEnzymeRenderSnapshotSerializer = {
  test: (val: any) => {
    if (isCheerioWrapper(val)) {
      return val.attr('class')?.startsWith('eui');
    } else {
      return false;
    }
  },
  print: (val: Cheerio, serialize: Function) => {
    const euiComponentName = getEuiComponentFromClassName(val.attr('class'))!;

    if (COMPONENTS_HTML.includes(euiComponentName)) {
      let children = '';
      children = serialize(val.children());
      children = removeSerializedSyntax(children);
      children = children.replace(/\n\n/g, '');
      children = fixIndentation(children.trim());

      return printWrappingComponent(euiComponentName, `\n${children}\n`);
    }
    if (COMPONENTS_TEXT.includes(euiComponentName)) {
      return printWrappingComponent(euiComponentName, val.text());
    }
    // Default to rendering an empty component
    return printEmptyComponent(euiComponentName);
  },
};
