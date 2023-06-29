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
import { EuiThemeAmsterdam } from '../../themes';
import { EuiCacheProvider } from './cache';
import { EuiPortalInsertion } from '../portal/portal.types';
import { PortalProvider } from '../portal/portal.provider';

const isEmotionCacheObject = (
  obj: EmotionCache | Object
): obj is EmotionCache => obj.hasOwnProperty('key');

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
   * Provide global settings for EuiPortal props.
   */
  portal?: {
    /**
     * Provide a global setting for EuiPortal's default insertion position.
     * If not specified or set to `null`, `EuiPortal` will insert itself into the `document.body` by default.
     */
    insert: EuiPortalInsertion | null;
  };
}

export const EuiProvider = <T extends {} = {}>({
  cache = fallbackCache,
  theme = EuiThemeAmsterdam,
  globalStyles: Globals = EuiGlobalStyles,
  utilityClasses: Utilities = EuiUtilityClasses,
  colorMode,
  modify,
  children,
  portal,
}: PropsWithChildren<EuiProviderProps<T>>) => {
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
        <CurrentEuiBreakpointProvider>
          {portal?.insert ? (
            <PortalProvider insert={portal.insert}>{children}</PortalProvider>
          ) : (
            children
          )}
        </CurrentEuiBreakpointProvider>
      </EuiThemeProvider>
    </EuiCacheProvider>
  );
};
