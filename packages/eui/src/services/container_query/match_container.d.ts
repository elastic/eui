/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Type declarations for the matchContainer polyfill.
 * @see {@link https://github.com/w3c/csswg-drafts/issues/6205 | W3C CSS WG proposal}
 */

declare global {
  interface Element {
    matchContainer(containerQueryString: string): ContainerQueryList;
  }

  interface ContainerQueryList extends EventTarget {
    container: string;
    matches: boolean;
  }

  interface ContainerQueryListEvent extends Event {
    container: string;
    matches: boolean;
  }
}

export {};
