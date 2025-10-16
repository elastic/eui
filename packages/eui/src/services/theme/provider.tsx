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
  EuiThemeColorModeStandard,
  EuiThemeHighContrastModeProp,
  EuiThemeHighContrastMode,
  EuiThemeSystem,
  EuiThemeModifications,
  EuiThemeComputed,
} from './types';
import { EUI_VIS_COLOR_STORE } from '../color';

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

  const [system, setSystem] = useState(_system || parentSystem);
  const prevSystemKey = useRef(system.key);

  const [modifications, setModifications] = useState<EuiThemeModifications>(
    mergeDeep(parentModifications, _modifications)
  );
  const prevModifications = useRef(modifications);

  const [colorMode, setColorMode] = useState<EuiThemeColorModeStandard>(
    getColorMode(_colorMode, parentColorMode, isForced)
  );
  const prevColorMode = useRef(colorMode);

  const highContrastMode: EuiThemeHighContrastMode = useMemo(() => {
    if (isForced) return 'forced'; // System forced high contrast mode will always supercede application settings
    if (_highContrastMode === true) return 'preferred'; // Convert the boolean prop to our internal enum
    if (_highContrastMode === false) return false; // Allow `false` prop to override user/system preference
    return parentHighContrastMode; // Fall back to the parent/system setting
  }, [_highContrastMode, parentHighContrastMode, isForced]);
  const prevHighContrastMode = useRef(highContrastMode);

  const modificationsWithHighContrast = useHighContrastModifications({
    highContrastMode,
    colorMode,
    system,
    modifications,
  });

  const isParentTheme = useRef(
    isGlobalTheme
      ? prevSystemKey.current === DEFAULTS.system.key &&
          colorMode === DEFAULTS.colorMode &&
          highContrastMode === DEFAULTS.highContrastMode &&
          !_modifications
      : prevSystemKey.current === parentSystem.key &&
          colorMode === parentColorMode &&
          highContrastMode === parentHighContrastMode &&
          isEqual(parentModifications, modifications)
  );

  const updateVisColorStore = useCallback(
    (theme: EuiThemeComputed, isGlobalTheme: boolean) => {
      if (isGlobalTheme) {
        EUI_VIS_COLOR_STORE.setVisColors(theme.colors.vis);
      }
    },
    []
  );

  const getInitialTheme = () => {
    const theme = getComputed(
      system,
      buildTheme(
        modificationsWithHighContrast,
        `_${system.key}`
      ) as typeof system,
      colorMode,
      highContrastMode
    );

    setTimeout(() => {
      updateVisColorStore(theme, isGlobalTheme);
    });

    return theme;
  };

  const [theme, setTheme] = useState(
    isParentTheme.current && Object.keys(parentTheme).length
      ? { ...parentTheme } // Intentionally create a new object to break referential equality
      : getInitialTheme()
  );

  useEffect(() => {
    const newSystem = _system || parentSystem;
    if (prevSystemKey.current !== newSystem.key) {
      setSystem(newSystem);
      prevSystemKey.current = newSystem.key;
      isParentTheme.current = false;
    }
  }, [_system, parentSystem, theme, updateVisColorStore]);

  useEffect(() => {
    updateVisColorStore(theme, isGlobalTheme);
  }, [theme, colorMode, isGlobalTheme, updateVisColorStore]);

  useEffect(() => {
    const newModifications = mergeDeep(parentModifications, _modifications);
    if (!isEqual(prevModifications.current, newModifications)) {
      setModifications(newModifications);
      prevModifications.current = newModifications;
      isParentTheme.current = false;
    }
  }, [_modifications, parentModifications]);

  useEffect(() => {
    const newColorMode = getColorMode(_colorMode, parentColorMode, isForced);
    if (!isEqual(newColorMode, prevColorMode.current)) {
      setColorMode(newColorMode);
      prevColorMode.current = newColorMode;
      isParentTheme.current = false;
    }
  }, [_colorMode, parentColorMode, isForced]);

  useEffect(() => {
    if (prevHighContrastMode.current !== highContrastMode) {
      isParentTheme.current = false;
    }
  }, [highContrastMode]);

  useEffect(() => {
    if (!isParentTheme.current) {
      /* Enables recomputation of component colors when flags are overridden on the provider
      by adding the respective key to modifications to trigger a recomputation. */
      // NOTE: Keeping this as placeholder for potential future usage during Borealis changes
      // TODO: remove once visual refresh is completed and flags are obsolete
      const flagsToRecompute:
        | Array<{ flag: string; componentKey: string }>
        | [] = [];

      const keys: { [key: string]: { LIGHT: {}; DARK: {} } } = {};

      const forceRecomputeComponents = flagsToRecompute.some((item) => {
        if (!item) return false;

        if (
          Object.keys(modifications.flags ?? {}).includes(item.flag) &&
          !Object.keys(modifications.components ?? {}).includes(
            item.componentKey
          )
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

      const rebuiltTheme = getComputed(
        system,
        buildTheme<any>(enhancedModifications, `_${system.key}`),
        colorMode,
        highContrastMode
      );

      setTheme(rebuiltTheme);
    }
  }, [
    colorMode,
    highContrastMode,
    system,
    modificationsWithHighContrast,
    modifications,
  ]);

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
