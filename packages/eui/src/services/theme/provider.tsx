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
} from './context';
import { EuiEmotionThemeProvider } from './emotion';
import { EuiThemeMemoizedStylesProvider } from './style_memoization';
import { buildTheme, getColorMode, getComputed, mergeDeep } from './utils';
import {
  EuiThemeColorMode,
  EuiThemeColorModeStandard,
  EuiThemeSystem,
  EuiThemeModifications,
  EuiThemeComputed,
} from './types';
import { EUI_VIS_COLOR_STORE } from '../color';

export interface EuiThemeProviderProps<T> extends PropsWithChildren {
  theme?: EuiThemeSystem<T>;
  colorMode?: EuiThemeColorMode;
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
  const parentTheme = useContext(EuiThemeContext);

  const [system, setSystem] = useState(_system || parentSystem);
  const prevSystemKey = useRef(system.key);

  // To reduce the number of window resize listeners, only render a
  // CurrentEuiBreakpointProvider for the top level parent theme, or for
  // nested themes only if modified breakpoint overrides are passed
  const EuiConditionalBreakpointProvider = useMemo(() => {
    return isGlobalTheme || _modifications?.breakpoint
      ? CurrentEuiBreakpointProvider
      : Fragment;
  }, [isGlobalTheme, _modifications]);

  const [modifications, setModifications] = useState<EuiThemeModifications>(
    mergeDeep(parentModifications, _modifications)
  );
  const prevModifications = useRef(modifications);

  const [colorMode, setColorMode] = useState<EuiThemeColorModeStandard>(
    getColorMode(_colorMode, parentColorMode)
  );
  const prevColorMode = useRef(colorMode);

  const isParentTheme = useRef(
    prevSystemKey.current === parentSystem.key &&
      colorMode === parentColorMode &&
      isEqual(parentModifications, modifications)
  );

  const updateVisColorStore = useCallback((theme: EuiThemeComputed) => {
    EUI_VIS_COLOR_STORE.setVisColors(
      theme.colors.vis,
      theme.flags?.hasVisColorAdjustment ?? true
    );
  }, []);

  const getInitialTheme = () => {
    const theme = getComputed(
      system,
      buildTheme(modifications, `_${system.key}`) as typeof system,
      colorMode
    );

    setTimeout(() => {
      updateVisColorStore(theme);
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

      updateVisColorStore(theme);
    }
  }, [_system, parentSystem, theme, updateVisColorStore]);

  useEffect(() => {
    const newModifications = mergeDeep(parentModifications, _modifications);
    if (!isEqual(prevModifications.current, newModifications)) {
      setModifications(newModifications);
      prevModifications.current = newModifications;
      isParentTheme.current = false;
    }
  }, [_modifications, parentModifications]);

  useEffect(() => {
    const newColorMode = getColorMode(_colorMode, parentColorMode);
    if (!isEqual(newColorMode, prevColorMode.current)) {
      setColorMode(newColorMode);
      prevColorMode.current = newColorMode;
      isParentTheme.current = false;
    }
  }, [_colorMode, parentColorMode]);

  useEffect(() => {
    if (!isParentTheme.current) {
      setTheme(
        getComputed(
          system,
          buildTheme(modifications, `_${system.key}`) as typeof system,
          colorMode
        )
      );
    }
  }, [colorMode, system, modifications]);

  const [themeCSSVariables, _setThemeCSSVariables] = useState<CSSObject>();
  const setThemeCSSVariables = useCallback(
    (variables: CSSObject) =>
      _setThemeCSSVariables((previous) => ({ ...previous, ...variables })),
    []
  );

  const nestedThemeContext = useMemo(() => {
    return {
      isGlobalTheme: false, // The theme that determines the global body styles
      bodyColor: isGlobalTheme ? theme.colors.text : bodyColor,
      hasDifferentColorFromGlobalTheme: isGlobalTheme
        ? false
        : bodyColor !== theme.colors.text,
      colorClassName: css`
        label: euiColorMode-${_colorMode || colorMode};
        color: ${theme.colors.text};
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
      </EuiColorModeContext.Provider>
    </>
  );
};
