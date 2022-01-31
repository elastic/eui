/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { EuiGlobalStyles, EuiGlobalStylesProps } from '../../global_styling';
import {
  EuiThemeProvider,
  EuiThemeProviderProps,
  EuiThemeSystem,
} from '../../services';
import { EuiThemeAmsterdam } from '../../themes';

export interface EuiProviderProps<T>
  extends Omit<EuiThemeProviderProps<T>, 'children' | 'theme'>,
    EuiGlobalStylesProps {
  /**
   * Provide a specific EuiTheme; Defaults to EuiThemeAmsterdam;
   * Pass `null` to remove all theming including global reset
   */
  theme?: EuiThemeSystem | null;
  /**
   * Provide global styles via `@emotion/react` `Global` for your custom theme.
   * Pass `false` to remove the default EUI global styles.
   */
  globalStyles?: false | ((params: any) => JSX.Element | null);
  /**
   * Provide a cache configuration from `@emotion/cache`
   */
  cache?: EmotionCache;
}

export const EuiProvider = <T extends {} = {}>({
  cache,
  theme = EuiThemeAmsterdam,
  globalStyles: GlobalStyles = EuiGlobalStyles,
  colorMode,
  modify,
  children,
}: PropsWithChildren<EuiProviderProps<T>>) => {
  return theme !== null && GlobalStyles !== false ? (
    <EuiThemeProvider theme={theme} colorMode={colorMode} modify={modify}>
      {cache ? (
        <CacheProvider value={cache}>
          <GlobalStyles />
        </CacheProvider>
      ) : (
        <GlobalStyles />
      )}
      {children}
    </EuiThemeProvider>
  ) : (
    <EuiThemeProvider colorMode={colorMode}>{children}</EuiThemeProvider>
  );
};
