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
  FunctionComponent,
} from 'react';
import isEqual from 'lodash/isEqual';

import {
  EuiSystemContext,
  EuiThemeContext,
  EuiOverrideContext,
  EuiColorModeContext,
} from './context';
import { getColorMode, mergeDeep, getComputed, buildTheme } from './utils';
import { EuiTheme, EuiThemeColorMode } from './types';

export interface EuiThemeProviderProps {
  theme?: EuiTheme;
  colorMode?: EuiThemeColorMode;
  overrides?: EuiTheme;
  children: any;
}

export const EuiThemeProvider: FunctionComponent<EuiThemeProviderProps> = ({
  theme: _system,
  colorMode: _colorMode,
  overrides: _overrides = {},
  children,
}) => {
  const parentSystem = useContext(EuiSystemContext);
  const parentOverrides = useContext(EuiOverrideContext);
  const parentColorMode = useContext(EuiColorModeContext);
  const parentTheme = useContext(EuiThemeContext);

  const [system, setSystem] = useState(_system || parentSystem);
  const prevSystemKey = useRef(system.key);

  const [overrides, setOverrides] = useState(
    mergeDeep(parentOverrides, _overrides)
  );
  const prevOverrides = useRef(overrides);

  const [colorMode, setColorMode] = useState(
    getColorMode(_colorMode, parentColorMode)
  );
  const prevColorMode = useRef(colorMode);

  // TODO: Flip if return to using parent
  const isParentTheme = useRef(
    prevSystemKey.current === parentSystem.key &&
      colorMode === parentColorMode &&
      isEqual(parentOverrides, overrides)
  );

  const [theme, setTheme] = useState(
    Object.keys(parentTheme).length
      ? parentTheme
      : getComputed(colorMode, system, buildTheme(overrides, `_${system.key}`))
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
    const newOverrides = mergeDeep(parentOverrides, _overrides);
    if (!isEqual(prevOverrides.current, newOverrides)) {
      setOverrides(newOverrides);
      prevOverrides.current = newOverrides;
      isParentTheme.current = false;
    }
  }, [_overrides, parentOverrides]);

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
        getComputed(colorMode, system, buildTheme(overrides, `_${system.key}`))
      );
    }
  }, [colorMode, system, overrides]);

  return (
    <EuiColorModeContext.Provider value={colorMode}>
      <EuiSystemContext.Provider value={system}>
        <EuiOverrideContext.Provider value={overrides}>
          <EuiThemeContext.Provider value={theme}>
            {children}
          </EuiThemeContext.Provider>
        </EuiOverrideContext.Provider>
      </EuiSystemContext.Provider>
    </EuiColorModeContext.Provider>
  );
};
