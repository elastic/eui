/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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

  // TODO: Flip if return to using parent
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
