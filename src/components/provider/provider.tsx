/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';

import {
  EuiGlobalStyles,
  EuiGlobalStylesProps,
} from '../../global_styling/reset/global_styles';
import { EuiThemeProvider, EuiThemeProviderProps } from '../../services';

export interface EuiProviderProps<T>
  extends Omit<EuiThemeProviderProps<T>, 'children'>,
    EuiGlobalStylesProps {
  cache?: EmotionCache;
}

export function EuiProvider<T = {}>({
  cache,
  theme,
  colorMode,
  modify,
  resetStyles,
  children,
}: PropsWithChildren<EuiProviderProps<T>>) {
  return (
    <EuiThemeProvider theme={theme} colorMode={colorMode} modify={modify}>
      {cache ? (
        <CacheProvider value={cache}>
          <EuiGlobalStyles resetStyles={resetStyles} />
        </CacheProvider>
      ) : (
        <EuiGlobalStyles resetStyles={resetStyles} />
      )}
      {children}
    </EuiThemeProvider>
  );
}
