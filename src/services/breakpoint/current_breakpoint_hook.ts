/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useContext } from 'react';

import { CurrentEuiBreakpointContext } from './current_breakpoint';

/**
 * Hook util / syntactical sugar for useContext()
 *
 * This hook is in its own separate file to make mocking it
 * as a testenv easy for Jest unit tests
 */
export const useCurrentEuiBreakpoint = () => {
  const currentBreakpoint = useContext(CurrentEuiBreakpointContext);
  return currentBreakpoint;
};
