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

import React, { forwardRef, useContext } from 'react';

import {
  EuiThemeContext,
  EuiOverrideContext,
  EuiColorModeContext,
} from './context';
import {
  EuiThemeColorMode,
  EuiThemeOverrides,
  EuiThemeComputed,
} from './types';

export const useEuiTheme = <T extends {}>(): [
  EuiThemeComputed<T>,
  EuiThemeColorMode,
  EuiThemeOverrides<T>
] => {
  const theme = useContext(EuiThemeContext);
  const overrides = useContext(EuiOverrideContext);
  const colorMode = useContext(EuiColorModeContext);

  return [
    theme as EuiThemeComputed<T>,
    colorMode,
    overrides as EuiThemeOverrides<T>,
  ];
};

export const withEuiTheme = <T extends {}, U extends {}>(
  Component: React.ComponentType<
    T & {
      theme: {
        theme: EuiThemeComputed<U>;
        colorMode: EuiThemeColorMode;
      };
    }
  >
) => {
  const componentName = Component.displayName || Component.name || 'Component';
  const Render = (props: T, ref: React.Ref<T>) => {
    const [theme, colorMode] = useEuiTheme<U>();
    return (
      <Component
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
