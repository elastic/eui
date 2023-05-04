/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  getEuiComponentFromClassName,
  fixIndentation,
  printEmptyComponent,
  printWrappingComponent,
  removeSerializedSyntax,
} from '../utils';
import { COMPONENTS_HTML, COMPONENTS_TEXT } from '../components';

export const euiRTLRenderSnapshotSerializer = {
  test: (val: any) => {
    if (val instanceof HTMLElement) {
      return val.className?.startsWith('eui');
    } else {
      return false;
    }
  },
  print: (val: HTMLElement, serialize: Function) => {
    const euiComponentName = getEuiComponentFromClassName(val.className)!;

    if (COMPONENTS_HTML.includes(euiComponentName)) {
      let children = '';
      try {
        children = serialize(val.children); // serialize sometimes throws an error :/
        children = removeSerializedSyntax(children);
      } catch {
        // Fall back to displaying the raw HTML if we can't serialize the children
        children = val.innerHTML;
        children = children.split('>').join('>\n');
        children = children.split(/(?<!>)<\//).join('\n</'); // Negative lookbehind for, e.g. Text</div>
      }
      children = fixIndentation(children.trim());

      return printWrappingComponent(euiComponentName, `\n${children}\n`);
    }
    if (COMPONENTS_TEXT.includes(euiComponentName)) {
      return printWrappingComponent(euiComponentName, val.textContent);
    }
    // Default to rendering an empty component
    return printEmptyComponent(euiComponentName);
  },
};
