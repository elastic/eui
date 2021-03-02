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
  EuiModificationsContext,
  EuiColorModeContext,
} from './context';
import {
  EuiThemeColorMode,
  EuiThemeModifications,
  EuiThemeComputed,
} from './types';

export const useEuiTheme = <T extends {} = {}>(): {
  euiTheme: EuiThemeComputed<T>;
  colorMode: EuiThemeColorMode;
  modifications: EuiThemeModifications<T>;
} => {
  const theme = useContext(EuiThemeContext);
  const colorMode = useContext(EuiColorModeContext);
  const modifications = useContext(EuiModificationsContext);

  return {
    euiTheme: theme as EuiThemeComputed<T>,
    colorMode,
    modifications: modifications as EuiThemeModifications<T>,
  };
};

export interface WithEuiThemeProps<P = {}> {
  theme: {
    euiTheme: EuiThemeComputed<P>;
    colorMode: EuiThemeColorMode;
  };
}
export const withEuiTheme = <T extends {} = {}, U extends {} = {}>(
  Component: React.ComponentType<T & WithEuiThemeProps<U>>
) => {
  const componentName = Component.displayName || Component.name || 'Component';
  const Render = (
    props: Omit<T, keyof WithEuiThemeProps<U>>,
    ref: React.Ref<Omit<T, keyof WithEuiThemeProps<U>>>
  ) => {
    const { euiTheme, colorMode } = useEuiTheme<U>();
    return (
      <Component
        theme={{
          euiTheme,
          colorMode,
        }}
        ref={ref}
        {...(props as T)}
      />
    );
  };

  const WithEuiTheme = forwardRef(Render);

  WithEuiTheme.displayName = `WithEuiTheme(${componentName})`;

  return WithEuiTheme;
};
