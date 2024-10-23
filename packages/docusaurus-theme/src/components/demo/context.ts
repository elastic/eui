/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, useContext } from 'react';
import { DemoSourceMeta } from './demo';

export interface DemoContextObject {
  /**
   * Array of all available sources for this demo instance
   */
  sources: DemoSourceMeta[];

  /**
   * Add source to the list of available sources
   * This should only be used internally when initializing the component!
   */
  addSource(source: DemoSourceMeta): void;
}

export const DemoContext = createContext<DemoContextObject>({
  sources: [],
  addSource: () => {},
});

export const useDemoContext = () => useContext(DemoContext);
