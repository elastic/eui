/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import { throttle } from '../../services';
import { EuiBreakpointSize, getBreakpoint } from '../../services/breakpoint';

export type EuiHideForBreakpoints = EuiBreakpointSize;

export interface EuiHideForProps {
  /**
   * Required otherwise nothing ever gets returned
   */
  children: ReactNode;
  /**
   * List of all the responsive sizes to hide the children for.
   * Array of #EuiBreakpointSize
   */
  sizes: EuiHideForBreakpoints[] | 'all' | 'none';
}

export const EuiHideFor: FunctionComponent<EuiHideForProps> = ({
  children,
  sizes,
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getBreakpoint(typeof window === 'undefined' ? -Infinity : window.innerWidth)
  );

  const functionToCallOnWindowResize = throttle(() => {
    const newBreakpoint = getBreakpoint(window.innerWidth);
    if (newBreakpoint !== currentBreakpoint) {
      setCurrentBreakpoint(newBreakpoint);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Add window resize handlers
  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    return () => {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [functionToCallOnWindowResize]);

  if (
    sizes === 'all' ||
    sizes.includes(currentBreakpoint as EuiBreakpointSize)
  ) {
    return null;
  }

  return <>{children}</>;
};
