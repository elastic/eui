/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useState } from 'react';
import { useEuiTheme, type UseEuiTheme } from '@elastic/eui';

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

/**
 * POC: JS mirror of getNavbarBreakpoint().mobileMediaQuery.
 * Prefer this over useIsWithinMaxBreakpoint('xl') — that stays true for the
 * entire named `xl` range (until `xxl`), which is wider than our CSS cutoff.
 */
export const useIsNavbarCompact = (): boolean => {
  const euiThemeContext = useEuiTheme();
  const { mobileBreakpoint } = getNavbarBreakpoint(euiThemeContext);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${mobileBreakpoint}px)`
    );
    const update = () => setIsCompact(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [mobileBreakpoint]);

  return isCompact;
};
