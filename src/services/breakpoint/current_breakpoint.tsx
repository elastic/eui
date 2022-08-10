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
  FunctionComponent,
} from 'react';

import { _EuiThemeBreakpoint } from '../../global_styling/variables/breakpoint';
import { useEuiTheme } from '../theme';
import { throttle } from '../throttle';

import { getBreakpoint } from './breakpoint';

type CurrentEuiBreakpoint = _EuiThemeBreakpoint | undefined;

export const CurrentEuiBreakpointContext = createContext<CurrentEuiBreakpoint>(
  undefined
);

/**
 * Top level provider (nested within EuiProvider) which provides a single
 * resize listener that returns the current breakpoint based on window width
 */
export const CurrentEuiBreakpointProvider: FunctionComponent = ({
  children,
}) => {
  const {
    euiTheme: { breakpoint: breakpoints }, // Obtain the breakpoints map from the EUI theme
  } = useEuiTheme();

  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    CurrentEuiBreakpoint
  >(
    typeof window !== 'undefined'
      ? getBreakpoint(window.innerWidth, breakpoints)
      : undefined
  );

  useEffect(() => {
    const onWindowResize = throttle(() => {
      setCurrentBreakpoint(getBreakpoint(window.innerWidth, breakpoints));
    }, 50);

    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, [breakpoints]);

  return (
    <CurrentEuiBreakpointContext.Provider value={currentBreakpoint}>
      {children}
    </CurrentEuiBreakpointContext.Provider>
  );
};
