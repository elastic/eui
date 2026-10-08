/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * POC ONLY: global surface config. The real design is an `EuiProvider` option.
 * Must be set before first render; Emotion serializes styles at render time.
 */
export interface EuiSurfaceConfig {
  /** Container name that `euiBreakpoint` mixins query instead of the viewport */
  name: string;
  /**
   * Element the JS breakpoint hooks measure instead of `window`. `container` is where the React root or
   * portal is mounted (`EuiBreakpointContainerContext`). Return `null` to use `window`.
   */
  getRoot: (container?: HTMLElement) => HTMLElement | null;
}

let config: EuiSurfaceConfig | undefined;

export const setEuiSurfaceConfig = (next?: EuiSurfaceConfig) => {
  config = next;
};

export const getEuiSurfaceConfig = () => config;
