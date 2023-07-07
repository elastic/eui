/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import { cache as fallbackCache, EmotionCache } from '@emotion/css';

import {
  EuiGlobalStyles,
  EuiGlobalStylesProps,
} from '../../global_styling/reset/global_styles';
import { EuiUtilityClasses } from '../../global_styling/utility/utility';
import {
  EuiThemeProvider,
  EuiThemeProviderProps,
  EuiThemeSystem,
  CurrentEuiBreakpointProvider,
} from '../../services';
import { emitEuiProviderWarning } from '../../services/theme/warning';
import { EuiThemeAmsterdam } from '../../themes';
import { EuiCacheProvider } from './cache';
import { EuiProviderNestedCheck, useIsNestedEuiProvider } from './nested';
import {
  EuiComponentDefaults,
  EuiComponentDefaultsProvider,
} from './component_defaults';

const isEmotionCacheObject = (
  obj: EmotionCache | Object
): obj is EmotionCache => obj.hasOwnProperty('key');

export interface EuiProviderProps<T>
  extends PropsWithChildren,
    EuiGlobalStylesProps,
    Pick<EuiThemeProviderProps<T>, 'colorMode' | 'modify'> {
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
   * Provide utility classes.
   * Pass `false` to remove the default EUI utility classes.
   */
  utilityClasses?: false | ((params: any) => JSX.Element | null);
  /**
   * Provide a cache configuration(s) from `@emotion/cache`.
   *
   * - `default` will encompass all Emotion styles, including consumer defined appliction styles, not handled by nested cache instances.
   * - `global` will scope all EUI global and reset styles.
   * - `utility` will scope all EUI utility class styles.
   *
   * A cache instance provided as the sole value will function the same as the `default` cache.
   */
  cache?:
    | EmotionCache
    | {
        default?: EmotionCache;
        global?: EmotionCache;
        utility?: EmotionCache;
      };
  /**
   * Allows configuring specified component defaults across all usages, overriding
   * baseline EUI component defaults.
   *
   * Not all components will be supported, and configurable component defaults
   * will be considered on a case-by-case basis.
   *
   * Individual component prop usages will always override these defaults.
   */
  componentDefaults?: EuiComponentDefaults;
}

export const EuiProvider = <T extends {} = {}>({
  cache = fallbackCache,
  theme = EuiThemeAmsterdam,
  globalStyles: Globals = EuiGlobalStyles,
  utilityClasses: Utilities = EuiUtilityClasses,
  colorMode,
  modify,
  componentDefaults,
  children,
}: PropsWithChildren<EuiProviderProps<T>>) => {
  const isNested = useIsNestedEuiProvider();
  if (isNested) {
    const providerMessage = `\`EuiProvider\` should not be nested or used more than once, other than at the top level of your app.
    Use \`EuiThemeProvider\` instead for nested component-level theming: https://ela.st/euiprovider.`;

    emitEuiProviderWarning(providerMessage);
    return children as any;
  }

  let defaultCache;
  let globalCache;
  let utilityCache;
  if (cache) {
    if (isEmotionCacheObject(cache)) {
      cache.compat = true;
      defaultCache = cache;
    } else {
      if (cache.default) {
        cache.default.compat = true;
      }
      defaultCache = cache.default;
      if (cache.global) {
        cache.global.compat = true;
      }
      globalCache = cache.global;
      if (cache.utility) {
        cache.utility.compat = true;
      }
      utilityCache = cache.utility;
    }
  }

  return (
    <EuiProviderNestedCheck>
      <EuiCacheProvider cache={defaultCache ?? fallbackCache}>
        <EuiThemeProvider
          theme={theme ?? undefined}
          colorMode={colorMode}
          modify={modify}
        >
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
          <EuiComponentDefaultsProvider componentDefaults={componentDefaults}>
            <CurrentEuiBreakpointProvider>
              {children}
            </CurrentEuiBreakpointProvider>
          </EuiComponentDefaultsProvider>
        </EuiThemeProvider>
      </EuiCacheProvider>
    </EuiProviderNestedCheck>
  );
};
