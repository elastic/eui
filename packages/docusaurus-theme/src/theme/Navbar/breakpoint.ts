/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { UseEuiTheme } from '@elastic/eui';

const NAVBAR_MOBILE_BREAKPOINT_KEY = 'xl';

export const getNavbarBreakpoint = ({ euiTheme }: UseEuiTheme) => {
  const mobileBreakpoint = euiTheme.breakpoint[NAVBAR_MOBILE_BREAKPOINT_KEY];
  const desktopBreakpoint = mobileBreakpoint + 1;

  return {
    desktopBreakpoint,
    desktopMediaQuery: `@media (min-width: ${desktopBreakpoint}px)`,
    mobileBreakpoint,
    mobileMediaQuery: `@media (max-width: ${mobileBreakpoint}px)`,
  };
};
