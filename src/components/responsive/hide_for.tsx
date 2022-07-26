/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, FunctionComponent } from 'react';
import { useCurrentEuiBreakpoint, EuiBreakpointSize } from '../../services';

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
  const currentBreakpoint = useCurrentEuiBreakpoint();
  const isWithinBreakpointSizes =
    currentBreakpoint && sizes.includes(currentBreakpoint);

  if (sizes === 'all' || isWithinBreakpointSizes) {
    return null;
  }

  return <>{children}</>;
};
