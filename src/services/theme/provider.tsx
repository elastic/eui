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

import React, { useMemo, useContext, FunctionComponent } from 'react';

import {
  EuiThemeContext,
  EuiOverrideContext,
  EuiColorModeContext,
} from './context';
import { getColorMode, mergeDeep } from './utils';

export const EuiThemeProvider: FunctionComponent<any> = ({
  theme: themeConfig,
  colorMode: _colorMode,
  overrides: _overrides = {},
  children,
}: {
  theme?: any;
  colorMode?: string;
  overrides?: any;
  children: any;
}) => {
  const parentSystem = useContext(EuiThemeContext);
  const parentOverrides = useContext(EuiOverrideContext);
  const parentColorMode = useContext(EuiColorModeContext);

  const theme = useMemo(() => themeConfig || parentSystem, [
    themeConfig,
    parentSystem,
  ]);

  const colorMode = useMemo(() => getColorMode(_colorMode, parentColorMode), [
    _colorMode,
    parentColorMode,
  ]);
  const overrides = useMemo(() => {
    return mergeDeep(parentOverrides, _overrides);
  }, [_overrides, parentOverrides]);

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
