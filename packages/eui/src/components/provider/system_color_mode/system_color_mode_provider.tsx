/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { EuiThemeColorModeStandard } from '../../../services';

export const COLOR_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const EuiSystemColorModeProvider: FunctionComponent<{
  children: (systemColorMode: EuiThemeColorModeStandard) => ReactElement;
}> = ({ children }) => {
  // Check typeof and use optional chaining for SSR or test environments
  const [systemColorMode, setSystemColorMode] =
    useState<EuiThemeColorModeStandard>(() =>
      typeof window !== 'undefined' &&
      window.matchMedia?.(COLOR_MODE_MEDIA_QUERY)?.matches
        ? 'DARK'
        : 'LIGHT'
    );

  // Listen for system changes
  useEffect(() => {
    const eventListener = (event: MediaQueryListEvent) => {
      setSystemColorMode(event.matches ? 'DARK' : 'LIGHT');
    };

    // Optional chaining here is for test environments - SSR should not run useEffect
    window
      .matchMedia?.(COLOR_MODE_MEDIA_QUERY)
      .addEventListener?.('change', eventListener);

    // Clean up the listener on unmount
    return () => {
      window
        .matchMedia?.(COLOR_MODE_MEDIA_QUERY)
        .removeEventListener?.('change', eventListener);
    };
  }, []);

  return children(systemColorMode);
};
