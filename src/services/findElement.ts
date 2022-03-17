/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * A DOM node, a selector string (which will be passed to
 * `document.querySelector()` to find the DOM node), or a function that
 * returns a DOM node.
 */
export type ElementTarget = HTMLElement | string | (() => HTMLElement);

export const findElementBySelectorOrRef = (elementTarget?: ElementTarget) => {
  let node = elementTarget instanceof HTMLElement ? elementTarget : null;
  if (typeof elementTarget === 'string') {
    node = document.querySelector(elementTarget as string);
  } else if (typeof elementTarget === 'function') {
    node = (elementTarget as () => HTMLElement)();
  }
  return node;
};
