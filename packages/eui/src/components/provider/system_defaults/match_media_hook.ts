/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useEffect } from 'react';

export const useWindowMediaMatcher = (mediaQuery: string) => {
  // Check typeof and use optional chaining for SSR or test environments
  const [mediaMatches, setMediaMatches] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window?.matchMedia?.(mediaQuery)?.matches ?? false)
  );

  // Listen for system changes
  useEffect(() => {
    const eventListener = (event: MediaQueryListEvent) => {
      setMediaMatches(event.matches);
    };

    // Optional chaining here is for test environments - SSR should not run useEffect
    window.matchMedia?.(mediaQuery).addEventListener?.('change', eventListener);

    // Clean up the listener on unmount
    return () => {
      window
        .matchMedia?.(mediaQuery)
        .removeEventListener?.('change', eventListener);
    };
  }, [mediaQuery]);

  return mediaMatches;
};
