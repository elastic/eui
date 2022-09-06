/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, FunctionComponent } from 'react';
import { useCurrentEuiBreakpoint, EuiBreakpointSize } from '../../services';

export type EuiShowForBreakpoints = EuiBreakpointSize;

export interface EuiShowForProps {
  /**
   * Required otherwise nothing ever gets returned
   */
  children: ReactNode;
  /**
   * List of all the responsive sizes to show the children for.
   * Array of #EuiBreakpointSize
   */
  sizes: EuiShowForBreakpoints[] | 'all' | 'none';
}

export const EuiShowFor: FunctionComponent<EuiShowForProps> = ({
  children,
  sizes,
}) => {
  const currentBreakpoint = useCurrentEuiBreakpoint();
  const isWithinBreakpointSizes =
    currentBreakpoint && sizes.includes(currentBreakpoint);

  if (sizes === 'all' || isWithinBreakpointSizes) {
    return <>{children}</>;
  }

  return null;
};
