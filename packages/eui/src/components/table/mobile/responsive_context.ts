/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, useContext } from 'react';
import {
  useIsWithinMinBreakpoint,
  type EuiBreakpointSize,
} from '../../../services';
import { useComponentDefaults } from '../../provider/component_defaults';

export const DEFAULT_TABLE_BREAKPOINT: EuiBreakpointSize = 'm';

/**
 * Used by parent/top-level table components to determine isResponsive state
 * based on the passed breakpoint
 */
export const useIsEuiTableResponsive = (
  componentProp?: EuiBreakpointSize | boolean
): boolean => {
  const componentDefault =
    useComponentDefaults().EuiTable?.responsiveBreakpoint;
  const breakpoint =
    componentProp ?? componentDefault ?? DEFAULT_TABLE_BREAKPOINT;

  const isBoolean = typeof breakpoint === 'boolean';

  // Note: we're using `!useIsWithinMinBreakpoint` here instead of `useIsWithinMaxBreakpoint`
  // because it more accurately reflects the single breakpoint at which tables collapse
  const isResponsive = !useIsWithinMinBreakpoint(isBoolean ? '' : breakpoint);
  return isBoolean ? breakpoint : isResponsive;
};

/**
 * Context set by parent table components
 * Hook used by cells to fetch parent isResponsive state
 */
export const EuiTableIsResponsiveContext = createContext<boolean>(false);

export const useEuiTableIsResponsive = () =>
  useContext(EuiTableIsResponsiveContext);
