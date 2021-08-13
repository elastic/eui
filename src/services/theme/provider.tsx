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
  useState,
  PropsWithChildren,
} from 'react';
import isEqual from 'lodash/isEqual';

import {
  EuiSystemContext,
  EuiThemeContext,
  EuiModificationsContext,
  EuiColorModeContext,
} from './context';
import { buildTheme, getColorMode, getComputed, mergeDeep } from './utils';
import {
  EuiThemeColorMode,
  EuiThemeSystem,
  EuiThemeModifications,
} from './types';

export interface EuiThemeProviderProps<T> {
  theme?: EuiThemeSystem<T>;
  colorMode?: EuiThemeColorMode;
  modify?: EuiThemeModifications<T>;
  children: any;
}

export function EuiThemeProvider<T = {}>({
  theme: _system,
  colorMode: _colorMode,
  modify: _modifications,
  children,
}: PropsWithChildren<EuiThemeProviderProps<T>>) {
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

  const [colorMode, setColorMode] = useState<EuiThemeColorMode>(
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
      ? parentTheme
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

  return (
    <EuiColorModeContext.Provider value={colorMode}>
      <EuiSystemContext.Provider value={system}>
        <EuiModificationsContext.Provider value={modifications}>
          <EuiThemeContext.Provider value={theme}>
            {children}
          </EuiThemeContext.Provider>
        </EuiModificationsContext.Provider>
      </EuiSystemContext.Provider>
    </EuiColorModeContext.Provider>
  );
}
