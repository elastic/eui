/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, useContext, useEffect } from 'react';
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

  /**
   * Current snippet state registered by the demo.
   * Used by snippetFn to generate dynamic snippets.
   */
  snippetState: Record<string, unknown>;

  /**
   * Register snippet state from the demo component.
   * Call this whenever state changes that should be reflected in the snippet.
   */
  setSnippetState(state: Record<string, unknown>): void;
}

export const DemoContext = createContext<DemoContextObject>({
  sources: [],
  addSource: () => {},
  snippetState: {},
  setSnippetState: () => {},
});

export const useDemoContext = () => useContext(DemoContext);

/**
 * Hook for demo components to register their state for snippet generation.
 * Call this in your demo component with the state values that should appear in the snippet.
 *
 * @example
 * ```tsx
 * const [fill, setFill] = useState(false);
 * const [color, setColor] = useState('primary');
 * useSnippetState({ fill, color });
 * ```
 */
export const useSnippetState = (state: Record<string, unknown>) => {
  const { setSnippetState } = useDemoContext();

  useEffect(() => {
    setSnippetState(state);
  }, [Object.values(state).join(',')]);
};
