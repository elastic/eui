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
  forwardRef,
  useContext,
  useEffect,
  // useRef,
  useState,
} from 'react';
// import isEqual from 'lodash/isEqual';

import {
  EuiThemeContext,
  EuiOverrideContext,
  EuiColorModeContext,
} from './context';
import { EuiTheme, EuiThemeColorMode } from './types';
import { buildTheme, getComputed } from './utils';

export const useEuiTheme = (): [EuiTheme, EuiThemeColorMode, EuiTheme] => {
  const theme = useContext(EuiThemeContext);
  const overrides = useContext(EuiOverrideContext);
  const colorMode = useContext(EuiColorModeContext);

  // const prevThemeId = useRef(theme.key);
  // const prevOverrides = useRef(overrides);

  const [values, setValues] = useState<EuiTheme>(() => {
    return getComputed(theme, buildTheme(overrides, `_${theme.key}`));
  });
  useEffect(() => {
    // if (
    //   prevThemeId.current !== theme.key ||
    //   !isEqual(prevOverrides.current, overrides)
    // ) {
    //   prevThemeId.current = theme.key;
    //   prevOverrides.current = overrides;
    setValues(getComputed(theme, buildTheme(overrides, `_${theme.key}`)));
    // }
  }, [theme, overrides]);
  return [values[colorMode], colorMode, theme];
};

export const withEuiTheme = <T extends {}>(
  Component: React.ComponentType<
    T & {
      theme: {
        theme: EuiTheme;
        colorMode: EuiThemeColorMode;
      };
    }
  >
) => {
  const componentName = Component.displayName || Component.name || 'Component';
  const Render = (props: T, ref: React.Ref<T>) => {
    const [theme, colorMode] = useEuiTheme();
    return (
      <Component
        // TODO: Two props?
        theme={{
          theme,
          colorMode,
        }}
        ref={ref}
        {...props}
      />
    );
  };

  const WithEuiTheme = forwardRef(Render);

  WithEuiTheme.displayName = `WithEuiTheme(${componentName})`;

  return WithEuiTheme;
};
