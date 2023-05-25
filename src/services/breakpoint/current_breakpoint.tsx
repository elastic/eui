/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  FunctionComponent,
} from 'react';

import { keysOf } from '../../components/common';
import {
  _EuiThemeBreakpoint,
  _EuiThemeBreakpoints,
} from '../../global_styling/variables/breakpoint';
import { useEuiTheme } from '../theme';
import { throttle } from '../throttle';
import { sortMapByLargeToSmallValues } from './_sorting';

type CurrentEuiBreakpoint = _EuiThemeBreakpoint | undefined;

export const CurrentEuiBreakpointContext =
  createContext<CurrentEuiBreakpoint>(undefined);

/**
 * Top level provider (nested within EuiProvider) which provides a single
 * resize listener that returns the current breakpoint based on window width
 */
export const CurrentEuiBreakpointProvider: FunctionComponent = ({
  children,
}) => {
  // Obtain the breakpoints map from the EUI theme
  const {
    euiTheme: { breakpoint: breakpoints },
  } = useEuiTheme();

  // Ensure the breakpoints map is sorted from largest value to smallest
  const sortedBreakpoints: _EuiThemeBreakpoints = useMemo(
    () => sortMapByLargeToSmallValues(breakpoints),
    [breakpoints]
  );

  // Find the breakpoint (key) whose value is <= windowWidth starting with largest first
  const getBreakpoint = useCallback(
    (width: number) =>
      keysOf(sortedBreakpoints).find((key) => sortedBreakpoints[key] <= width),
    [sortedBreakpoints]
  );

  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<CurrentEuiBreakpoint>(
      typeof window !== 'undefined'
        ? getBreakpoint(window.innerWidth)
        : undefined
    );

  useEffect(() => {
    const onWindowResize = throttle(() => {
      setCurrentBreakpoint(getBreakpoint(window.innerWidth));
    }, 50);

    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, [getBreakpoint]);

  return (
    <CurrentEuiBreakpointContext.Provider value={currentBreakpoint}>
      {children}
    </CurrentEuiBreakpointContext.Provider>
  );
};
