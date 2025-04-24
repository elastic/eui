/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const cssSupportsSelector = (selector: string, value: string) => {
  return `
       @supports selector(${selector}) {${value}}
    `;
};

/**
 * Util to check if the "previous sibling" selector :has(+) is supported
 */
export const cssSupportsHasWithNextSibling = (value: string) => {
  return cssSupportsSelector(':has(+ *)', value);
};
