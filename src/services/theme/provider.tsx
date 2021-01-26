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
  useMemo,
  useRef,
  useState,
  FunctionComponent,
} from 'react';
import isEqual from 'lodash/isEqual';

import {
  EuiThemeContext,
  EuiOverrideContext,
  EuiColorModeContext,
} from './context';
import { getColorMode, mergeDeep } from './utils';
import { EuiTheme, EuiThemeColorMode } from './types';

export interface EuiThemeProviderProps {
  theme?: EuiTheme;
  colorMode?: EuiThemeColorMode;
  overrides?: EuiTheme;
  children: any;
}

export const EuiThemeProvider: FunctionComponent<EuiThemeProviderProps> = ({
  theme: _theme,
  colorMode: _colorMode,
  overrides: _overrides = {},
  children,
}) => {
  const parentSystem = useContext(EuiThemeContext);
  const parentOverrides = useContext(EuiOverrideContext);
  const parentColorMode = useContext(EuiColorModeContext);

  const [theme, setTheme] = useState(_theme || parentSystem);
  const prevThemeKey = useRef(theme.key);

  const [overrides, setOverrides] = useState(
    mergeDeep(parentOverrides, _overrides)
  );
  const prevOverrides = useRef(overrides);

  const colorMode = useMemo(() => getColorMode(_colorMode, parentColorMode), [
    _colorMode,
    parentColorMode,
  ]);

  useEffect(() => {
    const newTheme = _theme || parentSystem;
    if (prevThemeKey.current !== newTheme.key) {
      setTheme(newTheme);
      prevThemeKey.current = newTheme.key;
    }
  }, [_theme, parentSystem]);

  useEffect(() => {
    const newOverrides = mergeDeep(parentOverrides, _overrides);
    if (!isEqual(prevOverrides.current, newOverrides)) {
      console.log('overrides');
      setOverrides(newOverrides);
      prevOverrides.current = newOverrides;
    }
  }, [_overrides, parentOverrides]);

  // const theme = useMemo(() => _theme || parentSystem, [_theme, parentSystem]);

  // const colorMode = useMemo(() => getColorMode(_colorMode, parentColorMode), [
  //   _colorMode,
  //   parentColorMode,
  // ]);
  // const overrides = useMemo(() => mergeDeep(parentOverrides, _overrides), [
  //   _overrides,
  //   parentOverrides,
  // ]);

  return (
    <EuiColorModeContext.Provider value={colorMode}>
      <EuiThemeContext.Provider value={theme}>
        <EuiOverrideContext.Provider value={overrides}>
          {children}
        </EuiOverrideContext.Provider>
      </EuiThemeContext.Provider>
    </EuiColorModeContext.Provider>
  );
};
