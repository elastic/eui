/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, forwardRef } from 'react';
import { EmotionCache } from '@emotion/react';

import {
  EuiGlobalStyles,
  EuiGlobalStylesProps,
  EuiUtilityClasses,
} from '../../global_styling/reset/global_styles';
import {
  EuiThemeProvider,
  EuiThemeProviderProps,
  EuiThemeSystem,
  UseEuiTheme,
  useEuiTheme,
} from '../../services';
import { EuiThemeAmsterdam } from '../../themes';
import { EuiCacheContext, EuiCacheProvider, useEuiCacheContext } from './cache';

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
  globalCache?: EmotionCache;
  utilityClasses?: false | ((params: any) => JSX.Element | null);
  utilityCache?: EmotionCache;
  componentCache?: EmotionCache;
}

export const EuiProvider = <T extends {} = {}>({
  cache,
  componentCache,
  theme = EuiThemeAmsterdam,
  globalCache,
  globalStyles: Globals = EuiGlobalStyles,
  utilityCache,
  utilityClasses: Utilities = EuiUtilityClasses,
  colorMode,
  modify,
  children,
}: PropsWithChildren<EuiProviderProps<T>>) => (
  <>
    {theme && (
      <>
        <EuiCacheProvider
          cache={globalCache}
          children={Globals && <Globals />}
        />
        <EuiCacheProvider
          cache={utilityCache}
          children={Utilities && <Utilities />}
        />
      </>
    )}
    <EuiCacheContext.Provider value={componentCache}>
      <EuiCacheProvider cache={cache}>
        <EuiThemeProvider
          theme={theme ?? undefined}
          colorMode={colorMode}
          modify={modify}
        >
          {children}
        </EuiThemeProvider>
      </EuiCacheProvider>
    </EuiCacheContext.Provider>
  </>
);

// TODO: temporary

export interface WithEuiSystemProps<P = {}> {
  euiTheme: UseEuiTheme<P>;
}
export const withEuiSystem = <T extends {} = {}, U extends {} = {}>(
  Component: React.ComponentType<T & WithEuiSystemProps<U>>
) => {
  const componentName = Component.displayName || Component.name || 'Component';
  const Render = (
    props: Omit<T, keyof WithEuiSystemProps<U>>,
    ref: React.Ref<Omit<T, keyof WithEuiSystemProps<U>>>
  ) => {
    const euiTheme = useEuiTheme<U>();
    const cache = useEuiCacheContext();
    return (
      <EuiCacheProvider cache={cache}>
        <Component euiTheme={euiTheme} ref={ref} {...(props as T)} />
      </EuiCacheProvider>
    );
  };

  const WithEuiSystem = forwardRef(Render);

  WithEuiSystem.displayName = componentName;

  return WithEuiSystem;
};
