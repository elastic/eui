/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// We don't normally use 'I' prefixes, this file is an exception
interface IBrowser {
  isEventSupported: (name: string, element: EventTarget) => boolean;
}

const BrowserImpl: IBrowser = {
  isEventSupported: (name, element): boolean => {
    return `on${name}` in element;
  },
};

export const Browser = Object.freeze(BrowserImpl);
