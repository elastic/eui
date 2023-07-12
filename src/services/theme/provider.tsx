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
  PropsWithChildren,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { css } from '@emotion/css';
import isEqual from 'lodash/isEqual';

import type { CommonProps } from '../../components/common';

import {
  EuiSystemContext,
  EuiThemeContext,
  EuiNestedThemeContext,
  EuiModificationsContext,
  EuiColorModeContext,
} from './context';
import { EuiEmotionThemeProvider } from './emotion';
import { buildTheme, getColorMode, getComputed, mergeDeep } from './utils';
import {
  EuiThemeColorMode,
  EuiThemeColorModeStandard,
  EuiThemeSystem,
  EuiThemeModifications,
} from './types';

export interface EuiThemeProviderProps<T> {
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
}: PropsWithChildren<EuiThemeProviderProps<T>>) => {
  const { isGlobalTheme, bodyColor } = useContext(EuiNestedThemeContext);
  const parentSystem = useContext(EuiSystemContext);
  const parentModifications = useContext(EuiModificationsContext);
  const parentColorMode = useContext(EuiColorModeContext);
  const parentTheme = useContext(EuiThemeContext);

  const [system, setSystem] = useState(_system || parentSystem);
  const prevSystemKey = useRef(system.key);

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

  const [theme, setTheme] = useState(
    isParentTheme.current && Object.keys(parentTheme).length
      ? { ...parentTheme } // Intentionally create a new object to break referential equality
      : getComputed(
          system,
          buildTheme(modifications, `_${system.key}`) as typeof system,
          colorMode
        )
  );

  useEffect(() => {
    const newSystem = _system || parentSystem;
    if (prevSystemKey.current !== newSystem.key) {
      setSystem(newSystem);
      prevSystemKey.current = newSystem.key;
      isParentTheme.current = false;
    }
  }, [_system, parentSystem]);

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

  const nestedThemeContext = useMemo(() => {
    return {
      isGlobalTheme: false, // The theme that determines the global body styles
      bodyColor: isGlobalTheme ? theme.colors.text : bodyColor,
      hasDifferentColorFromGlobalTheme: isGlobalTheme
        ? false
        : bodyColor !== theme.colors.text,
      colorClassName: css`
        label: euiColorMode-${_colorMode};
        color: ${theme.colors.text};
      `,
    };
  }, [theme, isGlobalTheme, bodyColor, _colorMode]);

  const renderedChildren = useMemo(() => {
    if (isGlobalTheme) {
      return children; // No wrapper
    }

    const { cloneElement, className, ...rest } = wrapperProps || {};
    const props = {
      ...rest,
      className: classNames(className, nestedThemeContext.colorClassName),
    };

    if (cloneElement) {
      return React.cloneElement(children, {
        ...props,
        className: classNames(children.props.className, props.className),
      });
    } else {
      return (
        <span
          {...props}
          className={classNames('euiThemeProvider', props.className)}
        >
          {children}
        </span>
      );
    }
  }, [isGlobalTheme, nestedThemeContext, wrapperProps, children]);

  return (
    <EuiColorModeContext.Provider value={colorMode}>
      <EuiSystemContext.Provider value={system}>
        <EuiModificationsContext.Provider value={modifications}>
          <EuiThemeContext.Provider value={theme}>
            <EuiNestedThemeContext.Provider value={nestedThemeContext}>
              <EuiEmotionThemeProvider>
                {renderedChildren}
              </EuiEmotionThemeProvider>
            </EuiNestedThemeContext.Provider>
          </EuiThemeContext.Provider>
        </EuiModificationsContext.Provider>
      </EuiSystemContext.Provider>
    </EuiColorModeContext.Provider>
  );
};
