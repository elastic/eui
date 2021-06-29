/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
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
