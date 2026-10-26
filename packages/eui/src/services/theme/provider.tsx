/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
  PropsWithChildren,
  HTMLAttributes,
  Fragment,
} from 'react';
import { Global, type CSSObject } from '@emotion/react';
import isEqual from 'lodash/isEqual';

import type { CommonProps } from '../../components/common';
import { cloneElementWithCss } from '../emotion';
import { css, cx } from '../emotion/css';
import { CurrentEuiBreakpointProvider } from '../breakpoint/current_breakpoint';

import {
  EuiSystemContext,
  EuiThemeContext,
  EuiNestedThemeContext,
  EuiModificationsContext,
  EuiColorModeContext,
  EuiHighContrastModeContext,
  DEFAULTS,
} from './context';
import { EuiEmotionThemeProvider } from './emotion';
import { EuiThemeMemoizedStylesProvider } from './style_memoization';
import { useHighContrastModifications } from './high_contrast_overrides';
import { buildTheme, getColorMode, getComputed, mergeDeep } from './utils';
import {
  EuiThemeColorMode,
  EuiThemeHighContrastModeProp,
  EuiThemeHighContrastMode,
  EuiThemeSystem,
  EuiThemeModifications,
  EuiThemeComputed,
} from './types';
import { EUI_VIS_COLOR_STORE } from '../color';

/**
 * Caches `value` during render, only swapping in a new one once `isSame`
 * reports that it actually differs from the cached one.
 *
 * This keeps derived objects referentially stable (so that the - comparatively
 * expensive - theme computation isn't rerun on every render) without deferring
 * them to a `useEffect`/`setState` pair. Effect-synchronised state costs an
 * extra commit, in which consumers would see e.g. an updated `colorMode`
 * alongside a theme that is still computed from the previous one.
 */
const useStableValue = <T,>(
  value: T,
  isSame: (previous: T, next: T) => boolean
): T => {
  const ref = useRef(value);

  if (ref.current !== value && !isSame(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
};

export interface EuiThemeProviderProps<T> extends PropsWithChildren {
  theme?: EuiThemeSystem<T>;
  colorMode?: EuiThemeColorMode;
  highContrastMode?: EuiThemeHighContrastModeProp;
  modify?: EuiThemeModifications<T>;
  children: any;
  /**
   * Nested theme providers will receive a wrapping `span` tag in order to correctly
   * set the default text `color` that all nested children will inherit.
   *
   * If an extra wrapper is not desired, pass `{ cloneElement: true }`.
   * This requires a **single** child component that the correct color class can be passed to.
   *
   * The parent level `EuiProvider`/`EuiThemeProvider` will **not** render a wrapper element, as
   * the default inherited text color will be set on the page `body`.
   */
  wrapperProps?: HTMLAttributes<HTMLElement> &
    CommonProps & { cloneElement?: boolean };
}

export const EuiThemeProvider = <T extends {} = {}>({
  theme: _system,
  colorMode: _colorMode,
  highContrastMode: _highContrastMode,
  modify: _modifications,
  children,
  wrapperProps,
}: EuiThemeProviderProps<T>) => {
  const {
    isGlobalTheme,
    bodyColor,
    globalCSSVariables,
    setGlobalCSSVariables,
  } = useContext(EuiNestedThemeContext);
  const parentSystem = useContext(EuiSystemContext);
  const parentModifications = useContext(EuiModificationsContext);
  const parentColorMode = useContext(EuiColorModeContext);
  const parentHighContrastMode = useContext(EuiHighContrastModeContext);
  const parentTheme = useContext(EuiThemeContext);

  // If the user has an OS-wide high contrast theme applied, it will ignore EUI's
  // colors and light/dark mode. We should respect the user's system setting
  const isForced = parentHighContrastMode === 'forced';

  // To reduce the number of window resize listeners, only render a
  // CurrentEuiBreakpointProvider for the top level parent theme, or for
  // nested themes only if modified breakpoint overrides are passed
  const EuiConditionalBreakpointProvider = useMemo(() => {
    return isGlobalTheme || _modifications?.breakpoint
      ? CurrentEuiBreakpointProvider
      : Fragment;
  }, [isGlobalTheme, _modifications]);

  // Every value below is derived from props/parent context during render, so
  // that all context values this provider exposes - most notably `colorMode`
  // and the computed `theme` - always change within the same commit
  const system = useStableValue(
    _system || parentSystem,
    (previous, next) => previous.key === next.key
  );

  const mergedModifications = useMemo(
    () => mergeDeep(parentModifications, _modifications),
    [parentModifications, _modifications]
  );
  const modifications = useStableValue<EuiThemeModifications>(
    mergedModifications,
    isEqual
  );

  const colorMode = useMemo(
    () => getColorMode(_colorMode, parentColorMode, isForced),
    [_colorMode, parentColorMode, isForced]
  );

  const highContrastMode: EuiThemeHighContrastMode = useMemo(() => {
    if (isForced) return 'forced'; // System forced high contrast mode will always supercede application settings
    if (_highContrastMode === true) return 'preferred'; // Convert the boolean prop to our internal enum
    if (_highContrastMode === false) return false; // Allow `false` prop to override user/system preference
    return parentHighContrastMode; // Fall back to the parent/system setting
  }, [_highContrastMode, parentHighContrastMode, isForced]);

  const modificationsWithHighContrast = useHighContrastModifications({
    highContrastMode,
    colorMode,
    system,
    modifications,
  });

  // If this provider resolves to the exact same theme as its parent, the
  // already computed parent theme can be reused instead of recomputing it
  const isParentTheme = useMemo(
    () =>
      isGlobalTheme
        ? system.key === DEFAULTS.system.key &&
          colorMode === DEFAULTS.colorMode &&
          highContrastMode === DEFAULTS.highContrastMode &&
          !_modifications
        : system.key === parentSystem.key &&
          colorMode === parentColorMode &&
          highContrastMode === parentHighContrastMode &&
          isEqual(parentModifications, modifications),
    [
      isGlobalTheme,
      system,
      colorMode,
      highContrastMode,
      _modifications,
      parentSystem,
      parentColorMode,
      parentHighContrastMode,
      parentModifications,
      modifications,
    ]
  );

  // Depending on `parentTheme` itself would recompute this provider's theme every
  // time the parent's did, even where the parent's theme is not an input to it -
  // `parentModifications` already reaches `getComputed` through `modifications`
  const reusableParentTheme =
    isParentTheme && Object.keys(parentTheme).length ? parentTheme : null;

  const theme = useMemo<EuiThemeComputed>(() => {
    if (reusableParentTheme) {
      return { ...reusableParentTheme }; // Intentionally create a new object to break referential equality
    }

    /* Enables recomputation of component colors when flags are overridden on the provider
    by adding the respective key to modifications to trigger a recomputation. */
    // NOTE: Keeping this as placeholder for potential future usage during Borealis changes
    // TODO: remove once visual refresh is completed and flags are obsolete
    const flagsToRecompute: Array<{ flag: string; componentKey: string }> | [] =
      [];

    const keys: { [key: string]: { LIGHT: {}; DARK: {} } } = {};

    const forceRecomputeComponents = flagsToRecompute.some((item) => {
      if (!item) return false;

      if (
        Object.keys(modifications.flags ?? {}).includes(item.flag) &&
        !Object.keys(modifications.components ?? {}).includes(item.componentKey)
      ) {
        keys[item.componentKey] = { LIGHT: {}, DARK: {} };

        return true;
      }

      return false;
    });

    const componentModifications = forceRecomputeComponents
      ? { components: keys }
      : {};

    // force recomputing of color & component tokens based on flag changes
    const enhancedModifications = {
      ...modificationsWithHighContrast,
      ...componentModifications,
    };

    return getComputed(
      system,
      buildTheme<any>(enhancedModifications, `_${system.key}`),
      colorMode,
      highContrastMode
    );
  }, [
    reusableParentTheme,
    system,
    colorMode,
    highContrastMode,
    modifications,
    modificationsWithHighContrast,
  ]);

  // Genuine side effect - the vis color store is consumed outside of React
  useEffect(() => {
    if (isGlobalTheme) {
      EUI_VIS_COLOR_STORE.setVisColors(theme.colors.vis);
    }
  }, [theme, isGlobalTheme]);

  const [themeCSSVariables, _setThemeCSSVariables] = useState<CSSObject>();
  const setThemeCSSVariables = useCallback(
    (variables: CSSObject) =>
      _setThemeCSSVariables((previous) => {
        const merged = { ...previous, ...variables };
        Object.keys(merged).forEach((key) => {
          if (merged[key] === null) {
            delete merged[key];
          }
        });
        return merged;
      }),
    []
  );

  const nestedThemeContext = useMemo(() => {
    return {
      isGlobalTheme: false, // The theme that determines the global body styles
      bodyColor: isGlobalTheme ? theme.colors.textParagraph : bodyColor,
      hasDifferentColorFromGlobalTheme: isGlobalTheme
        ? false
        : bodyColor !== theme.colors.textParagraph,
      colorClassName: css`
        label: euiColorMode-${_colorMode || colorMode};
        color: ${theme.colors.textParagraph};
      `,
      setGlobalCSSVariables: isGlobalTheme
        ? setThemeCSSVariables
        : setGlobalCSSVariables,
      globalCSSVariables: isGlobalTheme
        ? themeCSSVariables
        : globalCSSVariables,
      setNearestThemeCSSVariables: setThemeCSSVariables,
      themeCSSVariables: themeCSSVariables,
    };
  }, [
    theme,
    isGlobalTheme,
    bodyColor,
    _colorMode,
    colorMode,
    setGlobalCSSVariables,
    globalCSSVariables,
    setThemeCSSVariables,
    themeCSSVariables,
  ]);

  const renderedChildren = useMemo(() => {
    if (isGlobalTheme) {
      return children; // No wrapper
    }

    const { cloneElement, className, ...rest } = wrapperProps || {};
    const props = {
      ...rest,
      className: cx(className, nestedThemeContext.colorClassName),
    };
    // Condition avoids rendering an empty Emotion selector if no
    // theme-specific CSS variables have been set by child components
    if (themeCSSVariables) {
      props.css = { label: 'euiCSSVariables', ...themeCSSVariables };
    }

    if (cloneElement) {
      return cloneElementWithCss(children, {
        ...props,
        className: cx(children.props.className, props.className),
      });
    } else {
      return (
        <span {...props} className={cx('euiThemeProvider', props.className)}>
          {children}
        </span>
      );
    }
  }, [
    isGlobalTheme,
    themeCSSVariables,
    nestedThemeContext,
    wrapperProps,
    children,
  ]);

  return (
    <>
      {isGlobalTheme && themeCSSVariables && (
        <Global styles={{ ':root': themeCSSVariables }} />
      )}
      <EuiColorModeContext.Provider value={colorMode}>
        <EuiHighContrastModeContext.Provider value={highContrastMode}>
          <EuiSystemContext.Provider value={system}>
            <EuiModificationsContext.Provider value={modifications}>
              <EuiThemeContext.Provider value={theme}>
                <EuiNestedThemeContext.Provider value={nestedThemeContext}>
                  <EuiThemeMemoizedStylesProvider>
                    <EuiEmotionThemeProvider>
                      <EuiConditionalBreakpointProvider>
                        {renderedChildren}
                      </EuiConditionalBreakpointProvider>
                    </EuiEmotionThemeProvider>
                  </EuiThemeMemoizedStylesProvider>
                </EuiNestedThemeContext.Provider>
              </EuiThemeContext.Provider>
            </EuiModificationsContext.Provider>
          </EuiSystemContext.Provider>
        </EuiHighContrastModeContext.Provider>
      </EuiColorModeContext.Provider>
    </>
  );
};
