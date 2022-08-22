/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useContext } from 'react';

import { keysOf } from '../../components/common';
import { breakpoint as breakpoints } from '../../themes/amsterdam/global_styling/variables/_breakpoint';
import { CurrentEuiBreakpointContext } from './current_breakpoint';

/**
 * Jest tests *likely* will not have a wrapping EuiProvider. If they don't,
 * this test mock mimics CurrentEuiBreakpoint logic (w/o resize observers).
 */
export const useCurrentEuiBreakpoint = () => {
  const context = useContext(CurrentEuiBreakpointContext);
  if (context !== undefined) return context; // Component has been wrapped, everything is fine.

  if (typeof window === 'undefined') return undefined; // SSR catch

  // Use the default Amsterdam breakpoints (which are already ordered by largest first)
  return keysOf(breakpoints).find(
    (key) => breakpoints[key] <= window.innerWidth
  );
};
